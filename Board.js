"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Board = /** @class */ (function () {
    function Board(width, height) {
        //Board Properties
        this.rows = [];
        this.width = width;
        this.height = height;
        for (var y = 0; y < height; y++) {
            var row = [];
            for (var x = 0; x < width; x++) {
                row.push({ bomb: false, revealed: false });
            }
            this.rows.push(row);
        }
    }
    Board.prototype.getCell = function (x, y) {
        if (y >= 0 && y < this.height) {
            if (x >= 0 && x < this.width) {
                return this.rows[y][x];
            }
        }
        return { bomb: false, revealed: false };
    };
    Board.prototype.placeMines = function (bombCount) {
        for (var b = 0; b < bombCount; b++) {
            var mineX = Math.floor(Math.random() * this.width);
            var mineY = Math.floor(Math.random() * this.height);
            this.rows[mineY][mineX].bomb = true;
        }
    };
    Board.prototype.countBombNeighbours = function (x, y) {
        var bombDanger = 
        //up and down
        this.getCell(x, y - 1).bomb + this.getCell(x, y + 1).bomb
            //left and right
            + this.getCell(x - 1, y).bomb + this.getCell(x + 1, y).bomb
            //top left and bottom right
            + this.getCell(x - 1, y - 1).bomb + this.getCell(x + 1, y + 1).bomb
            //top right and bottom left
            + this.getCell(x + 1, y - 1).bomb + this.getCell(x - 1, y + 1).bomb;
        return bombDanger;
    };
    Board.prototype.isRevealedZero = function (x, y) {
        return this.getCell(x, y).revealed && this.countBombNeighbours(x, y) == 0;
    };
    Board.prototype.isNeighborZero = function (x, y) {
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (j != 0 || i != 0) {
                    if (this.isRevealedZero(x + j, y + i)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    Board.prototype.infectZeroes = function () {
        var count;
        do {
            count = 0;
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    if (!this.getCell(x, y).revealed) {
                        if (this.isNeighborZero(x, y)) {
                            this.getCell(x, y).revealed = true;
                            count += 1;
                        }
                    }
                }
            }
        } while (count > 0);
    };
    Board.prototype.isBombed = function () {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                if (this.rows[y][x].bomb && this.rows[y][x].revealed) {
                    return true;
                }
            }
        }
        return false;
    };
    return Board;
}());
exports.default = Board;