class Board{
    constructor(width, height, bombs) {
        this.width = width
        this.height = height
        this.bombCount = bombs
        this.flags = this.bombCount
        this.rows = []
        //fills array with hidden spaces(no bombs here)
        for (let y = 0; y < height; y++){
            let row = []
            for (let x = 0; x < width; x++){
                row.push({bomb: false, revealed: false, flag: false})
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
        return {bomb: false, revealed: false, flag: false}
    }
    placeMines(){
        for (var b = 0; b < this.bombCount; b++) {
            var mineY = Math.floor(Math.random() * this.height);
            var mineX = Math.floor(Math.random() * this.width);
            this.rows[mineY][mineX].bomb = true;
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
    isNeighborRevealedZero(x, y) {
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
                        if (this.isNeighborRevealedZero(x, y)) {
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
    checkForWin(){
        for (let y = 0; y < this.height; y++){
            for (let x = 0; x < this.width; x++){
                let cell = this.getCell(x, y)
                if ((cell.bomb && !cell.flag) || (!cell.bomb && cell.flag))
                    return false
            }
        }
        return true
    }
}
//#############################################################

//Game
function initGame(width, height, bombs) {
    let board = new Board(width, height, bombs)
    board.placeMines();
    displayGame(board)
}
function displayGame(board) {
    //init and wipe for the page
    var container = document.getElementById("body1")
    container.innerHTML = ""
    //reveals anything next to a revealed zero
    if(board.checkForWin()){
        if (confirm("You won, I guess. Try again?")){
            location.reload()
        }
    }
    board.infectZeroes()
    //render board
    for (let y = 0; y < board.height; y++) {
        //initialize row
        let row = document.createElement("div")
        for (let x = 0; x < board.width; x++) {
            //initialize button
            let button = document.createElement("button")
            button.id = x.toString() + y.toString()
            button.classList = "button"
            //display button if revealed by click and
            if (board.getCell(x, y).revealed || board.isNeighborRevealedZero(x, y)){
                if (!board.getCell(x, y).bomb){
                    button.innerHTML = board.countBombNeighbours(x, y)
                } else {
                    button.innerHTML = "&#128163;"//bomb
                }
            } else {
                button.innerHTML = ""
            }
            if (board.getCell(x, y).flag){
                button.innerHTML = "&#9873;"
                button.style.color = "red";
            }
            //onClick handler
            button.onclick = (event) => {
                //reveal the value clicked
                if (event.button == 0) {
                        console.log(event.button)
                    board.getCell(x, y).revealed = true
                    //if bomb reload
                    if (board.getCell(x, y).bomb) {
                        if (confirm("You Lost HAH. try again?")) {
                            location.reload()
                        }
                    }
                    displayGame(board)
                }
            }
            button.oncontextmenu = (e) => {
                event.preventDefault()
                board.getCell(x, y).flag = !board.getCell(x, y).flag 
                displayGame(board)
            }
            //adds newly created button to row
            row.appendChild(button)
        }
        //adds completed row to the container
        container.appendChild(row)
    }
}
initGame(10, 10, 10)