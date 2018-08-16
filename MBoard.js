class Board{
    constructor(width, height, bombs) {
        this.width = width
        this.hieght = height
        this.bombCount = bombs
        this.rows = []
        //fills array with hidden spaces(no bombs here)
        for (let y = 0; y < height; y++){
            let row = []
            for (let x = 0; x < width; x++){
                row.push({bomb: false, revealed: false})
            }
            this.rows.push(row)
        }
    }
    //FUNCTIONS
    getCell(x, y){
        //check if called values exist
        if (x < this.width && x >= 0) {
            if (y < this.height && y >= 0) {
                return this.rows[y][x]
            }
        }
        return {bomb: false, revealed: false}
    }
    placeMines(){
        let randomX = Math.floor(Math.random() * this.width)
        let randomY = Math.floor(Math.random() * this.height)
        for(let b = 0; b < this.bombCount; b++){
            let mine = {bomb: true, revealed: false}
            this.getCell(randomX, randomY) = mine
        }
    }
    countBombNeighbours(x, y) {
        var bombDanger =
            //up and down
            this.getCell(x, y - 1).bomb + this.getCell(x, y + 1).bomb
            //left and right
            + this.getCell(x - 1, y).bomb + this.getCell(x + 1, y).bomb
            //top left and bottom right
            + this.getCell(x - 1, y - 1).bomb + this.getCell(x + 1, y + 1).bomb
            //top right and bottom left
            + this.getCell(x + 1, y - 1).bomb + this.getCell(x - 1, y + 1).bomb;
        return bombDanger
    }
    isRevealedZero(x, y) {
        return this.getCell(x, y).revealed && this.countBombNeighbours(x, y) == 0;
    }
    isNeighborZero(x, y) {
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (j != 0 || i != 0) {
                    if (this.isRevealedZero(x + j, y + i)) {
                        return true
                    }
                }
            }
        }
        return false
    }
    infectZeroes() {
        var count;
        do {
            count = 0
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    if (!this.getCell(x, y).revealed) {
                        if (this.isNeighborZero(x, y)) {
                            this.getCell(x, y).revealed = true
                            count += 1
                        }
                    }
                }
            }
        } while (count > 0)
    }
    isBombed(){
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                if (this.rows[y][x].bomb && this.rows[y][x].revealed) {
                    return true
                }
            }
        }
        return false
    }
}