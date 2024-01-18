"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    let rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]; 
    let cols = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let values = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let row = req.body.coordinate[0] ? req.body.coordinate[0].toUpperCase() : false;
    let column = req.body.coordinate[1] ? req.body.coordinate[1] : false;
    let value = req.body.value;
    let puzzle = req.body.puzzle;

    if (!solver.validate(puzzle).status) {
      res.json({error: solver.validate(puzzle).message})
    }

    if (req.body.coordinate && req.body.value) {
      if (rows.includes(row) && cols.includes(column)) {
        if (values.includes(value)) {
          let validColPlacement = solver.checkColPlacement(puzzle, row, column, value)
          let validRowPlacement = solver.checkRowPlacement(puzzle, row, column, value)
          let validRegionPlacement = solver.checkRegionPlacement(puzzle, row, column, value)
        } else {
          res.json({error: "Invalid value"})
        }
      } else {
        res.json({error: "Invalid coordinate"})
      }
    } else {
      res.json({error: "Required field(s) missing"})
    }
  });

  app.route("/api/solve").post((req, res) => {});
};
