"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    let row = req.body.coordinate[0].toUpperCase() || false;
    let column = req.body.coordinate[1] || false;
    let value = req.body.value || false;
    let puzzle = req.body.puzzle;
    if (row && column && value) {
      if (
        solver.checkColPlacement(puzzle, row, column, value) &&
        solver.checkRowPlacement(puzzle, row, column, value) &&
        solver.checkRegionPlacement(puzzle, row, column, value)
      ) {
        res.json({valid: true})
      } else {
        res.json({error: "conflict in region, row, column"})
      }
    }
  });

  app.route("/api/solve").post((req, res) => {});
};
