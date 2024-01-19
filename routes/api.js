"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    let rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let cols = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let values = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let row = req.body.coordinate
      ? req.body.coordinate[0].toUpperCase()
      : false;
    let column = req.body.coordinate ? req.body.coordinate[1] : false;
    let value = req.body.value;
    let puzzle = req.body.puzzle || false;

    if (req.body.coordinate && req.body.value && req.body.puzzle) {
      if (solver.validate(puzzle).status) {
        if (
          rows.includes(row) &&
          cols.includes(column) &&
          req.body.coordinate.length === 2
        ) {
          if (values.includes(value)) {
            let validColPlacement = solver.checkColPlacement(
              puzzle,
              row,
              column,
              value
            );
            let validRowPlacement = solver.checkRowPlacement(
              puzzle,
              row,
              column,
              value
            );
            let validRegionPlacement = solver.checkRegionPlacement(
              puzzle,
              row,
              column,
              value
            );

            console.log(
              validColPlacement,
              validRowPlacement,
              validRegionPlacement
            );

            if (
              validColPlacement &&
              validRowPlacement &&
              validRegionPlacement
            ) {
              res.json({ valid: true });
            } else {
              let indexOfGuess = solver.getIndex(puzzle, row, column, value);
              if (puzzle[indexOfGuess] === value) {
                res.json({ valid: true });
              } else {
                let possibleConflicts = [
                  {
                    name: "row",
                    status: false,
                  },
                  {
                    name: "column",
                    status: false,
                  },
                  {
                    name: "region",
                    status: false,
                  },
                ];

                let conflictStatus = [
                  validRowPlacement,
                  validColPlacement,
                  validRegionPlacement,
                ];

                let conflictArr = [];

                for (let i = 0; i < possibleConflicts.length; i++) {
                  if (possibleConflicts[i].status === conflictStatus[i]) {
                    conflictArr.push(possibleConflicts[i].name);
                  }
                }

                res.json({
                  valid: false,
                  conflict: conflictArr,
                });
              }
            }
          } else {
            res.json({ error: "Invalid value" });
          }
        } else {
          res.json({ error: "Invalid coordinate" });
        }
      } else {
        res.json({ error: solver.validate(puzzle).message });
      }
    } else {
      res.json({ error: "Required field(s) missing" });
    }
  });

  app.route("/api/solve").post((req, res) => {
    let solver = new SudokuSolver();
    let puzzle = req.body.puzzle || false;

    if (puzzle) {
      if (solver.validate(puzzle).status) {
        res.json(solver.validate(puzzle));
      } else {
        res.json({ error: solver.validate(puzzle).message });
      }
    } else {
      res.json({ error: "Required field missing" });
    }
  });
};
