
//global var init
var Board = import("Board.js")
var pageBody = document.getElementById("body1")
//let header = document.getElementById("header")

function render() {
    renderGrid(10, 10)
}
function renderGrid(w, h) {
    for (let i = 0; i < h; i++) {
        let row = document.createElement("div")
        for (let j = 0; j < w; j++) {
            //counter init
            let count = i * w + j
            //button init
            let button = document.createElement("button")
            //  button.innerText = "My Text"
            let buttontext = document.createTextNode(count)
            //adding elements
            //  classList => when working with it as a NamedList
            //  .className = "button" // probably more correct
            button.classList = "button"//class
            button.id = count
            button.onclick = () => console.log("You clicked button" + count)
            //pushing button into page
            button.appendChild(buttontext)
            row.appendChild(button)
        }
        pageBody.appendChild(row);
        // //divider
        // let rowEnder = document.createElement("div")
        // rowEnder.classList = "endRow"
        // pageBody.appendChild(rowEnder)
    }
}
//--------------------------------------------------------------------

render()