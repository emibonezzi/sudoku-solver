const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  // Solve a puzzle with valid puzzle string: POST request to /api/solve
  test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function (done) {
    let puzzle =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let solution =
      "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
    chai
      .request(server)
      .post("/api/solve")
      .send({
        puzzle: puzzle,
      })
      .end(function (err, res) {
        assert.strictEqual(res.body.solution, solution);
        done();
      });
  });

  // Solve a puzzle with missing puzzle string: POST request to /api/solve
  test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function (done) {
    let puzzle = "";
    let solution =
      "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
    chai
      .request(server)
      .post("/api/solve")
      .send({
        puzzle: puzzle,
      })
      .end(function (err, res) {
        assert.strictEqual(res.body.error, "Required field missing");
        done();
      });
  });

  // Solve a puzzle with invalid characters: POST request to /api/solve
  test("Solve a puzzle with invalid characters: POST request to /api/solve", function (done) {
    let puzzle =
      "1.F..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    chai
      .request(server)
      .post("/api/solve")
      .send({
        puzzle: puzzle,
      })
      .end(function (err, res) {
        assert.strictEqual(res.body.error, "Invalid characters in puzzle");
        done();
      });
  });

  // Solve a puzzle with incorrect length: POST request to /api/solve
  test("Solve a puzzle with incorrect length: POST request to /api/solve", function (done) {
    let puzzle =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....9264.37.";
    chai
      .request(server)
      .post("/api/solve")
      .send({
        puzzle: puzzle,
      })
      .end(function (err, res) {
        assert.strictEqual(
          res.body.error,
          "Expected puzzle to be 81 characters long",
        );
        done();
      });
  });

  // Solve a puzzle that cannot be solved: POST request to /api/solve
  test("Solve a puzzle that cannot be solved: POST request to /api/solve", function (done) {
    let puzzle =
      ".4.1..35.............2.5......4.89..26.....12.5.3....7..4...16.6....7....1..8..2.";
    chai
      .request(server)
      .post("/api/solve")
      .send({
        puzzle: puzzle,
      })
      .end(function (err, res) {
        assert.strictEqual(res.body.error, "Puzzle cannot be solved");
        done();
      });
  });

  // Check a puzzle placement with all fields: POST request to /api/check
  test("Check a puzzle placement with all fields: POST request to /api/check", function (done) {
    let puzzle =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = "A";
    let column = "2";
    let value = "3";
    chai
      .request(server)
      .post("/api/check")
      .send({
        coordinate: `${row}${column}`,
        puzzle: puzzle,
        value: value,
      })
      .end(function (err, res) {
        assert.strictEqual(res.body.valid, true);
        done();
      });
  });

  // Check a puzzle placement with single placement conflict: POST request to /api/check
  test("Check a puzzle placement with single placement conflict: POST request to /api/check", function (done) {
    let puzzle =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = "B";
    let column = "1";
    let value = "4";
    chai
      .request(server)
      .post("/api/check")
      .send({
        coordinate: `${row}${column}`,
        puzzle: puzzle,
        value: value,
      })
      .end(function (err, res) {
        assert.strictEqual(res.body.valid, false);
        assert.strictEqual(res.body.conflict.length, 1);
        done();
      });
  });

  // Check a puzzle placement with multiple placement conflicts: POST request to /api/check
  test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", function (done) {
    let puzzle =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = "A";
    let column = "2";
    let value = "5";
    chai
      .request(server)
      .post("/api/check")
      .send({
        coordinate: `${row}${column}`,
        puzzle: puzzle,
        value: value,
      })
      .end(function (err, res) {
        assert.strictEqual(res.body.valid, false);
        assert.strictEqual(res.body.conflict.length, 2);
        done();
      });
  });

  // Check a puzzle placement with all placement conflicts: POST request to /api/check
  test("Check a puzzle placement with all placement conflicts: POST request to /api/check", function (done) {
    let puzzle =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = "B";
    let column = "1";
    let value = "2";
    chai
      .request(server)
      .post("/api/check")
      .send({
        coordinate: `${row}${column}`,
        puzzle: puzzle,
        value: value,
      })
      .end(function (err, res) {
        assert.strictEqual(res.body.valid, false);
        assert.strictEqual(res.body.conflict.length, 3);
        done();
      });
  });

  // Check a puzzle placement with missing required fields: POST request to /api/check
  test("Check a puzzle placement with missing required fields: POST request to /api/check", function (done) {
    let puzzle =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = "B";
    let column = "2";
    let value = "2";
    chai
      .request(server)
      .post("/api/check")
      .send({
        coordinate: ``,
        puzzle: puzzle,
        value: value,
      })
      .end(function (err, res) {
        assert.strictEqual(res.body.error, "Required field(s) missing");
        done();
      });
  });

  // Check a puzzle placement with invalid characters: POST request to /api/check
  test("Check a puzzle placement with invalid characters: POST request to /api/check", function (done) {
    let puzzle =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = "B";
    let column = "2";
    let value = "F";
    chai
      .request(server)
      .post("/api/check")
      .send({
        coordinate: `${row}${column}`,
        puzzle: puzzle,
        value: value,
      })
      .end(function (err, res) {
        assert.strictEqual(res.body.error, "Invalid value");
        done();
      });
  });

  // Check a puzzle placement with incorrect length: POST request to /api/check
  test("Check a puzzle placement with incorrect length: POST request to /api/check", function (done) {
    let puzzle =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = "B";
    let column = "2";
    let value = "22";
    chai
      .request(server)
      .post("/api/check")
      .send({
        coordinate: `${row}${column}`,
        puzzle: puzzle,
        value: value,
      })
      .end(function (err, res) {
        assert.strictEqual(res.body.error, "Invalid value");
        done();
      });
  });

  // Check a puzzle placement with invalid placement coordinate: POST request to /api/check
  test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", function (done) {
    let puzzle =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = "B";
    let column = "F";
    let value = "2";
    chai
      .request(server)
      .post("/api/check")
      .send({
        coordinate: `${row}${column}`,
        puzzle: puzzle,
        value: value,
      })
      .end(function (err, res) {
        assert.strictEqual(res.body.error, "Invalid coordinate");
        done();
      });
  });

  // Check a puzzle placement with invalid placement value: POST request to /api/check
  test("Check a puzzle placement with invalid placement value: POST request to /api/check", function (done) {
    let puzzle =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = "B";
    let column = "2";
    let value = "X";
    chai
      .request(server)
      .post("/api/check")
      .send({
        coordinate: `${row}${column}`,
        puzzle: puzzle,
        value: value,
      })
      .end(function (err, res) {
        assert.strictEqual(res.body.error, "Invalid value");
        done();
      });
  });
});
