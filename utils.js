const localTheme = localStorage.getItem("data-theme")
let board,editablePositions=[],solvedBoard

const createBoardBtns = ()=>{
    const square = document.querySelectorAll("td div")
    for (const i of square) {
        for (let j = 0; j < 9; j++) {
            
            const button = document.createElement("button")
            button.style.fontSize="large"
            i.appendChild(button)
        }
    }
}

const createActionBtns = ()=>{
    const numsDiv = document.querySelector("#numbersDiv")
    for (let i = 1; i <= 9; i++) {
        const div = document.createElement("div")
        const button = document.createElement("button")
        const h5 = document.createElement("h5")
        button.textContent = i
        div.appendChild(button)
        div.appendChild(h5)
        numsDiv.appendChild(div)
    }
    const button = document.createElement("button")
    button.textContent = "X"
    numsDiv.appendChild(button)
}

const setTheme = ()=>{

    if(localTheme){
        document.body.setAttribute("data-theme",localTheme)
        themeBtn.textContent = localTheme==="light" ? "🔆" : "🌙"
    }
    else{
        localStorage.setItem("data-theme","light")
        themeBtn.textContent ="🔆"
}
}


themeBtn.addEventListener("click",(e)=>{
    e.stopPropagation()

    if(body.getAttribute("data-theme")==="light"){
        body.setAttribute("data-theme","dark")
        localStorage.setItem("data-theme","dark")
        themeBtn.textContent ="🌙"

    }
    else{
        body.setAttribute("data-theme","light")
        localStorage.setItem("data-theme","light")
        themeBtn.textContent ="🔆"

    }
})

const updateBoardArray = ()=>{
    const square = document.querySelectorAll("td div")
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if(square[i].children[j].textContent==" "){
                board[i][j]=0
            }
            else{
                board[i][j]=Number(square[i].children[j].textContent)

            }
        }
        
    }
    getDigitSituation()
}

const fillBoardDisplay = ()=>{
    const square = document.querySelectorAll("td div")

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if(editablePositions.find(el=> el[0]===i && el[1]===j)){
                square[i].children[j].setAttribute("available","yes")
            }
            else{
                square[i].children[j].removeAttribute("available")

            }
            if(board[i][j]===0){
                square[i].children[j].textContent=" "

            }
            else{

                square[i].children[j].textContent=`${board[i][j]}`
            }
        }
    }
}
const removeHighLight = ()=>{
    const nums = document.querySelectorAll(".highlight")
    const selected = document.querySelector("#selected")
    for (const i of nums) {
        if(i!==selected){

            i.classList.remove("highlight")
        }
    }
}

const highlightSameDigit = (digit)=>{
    removeHighLight()
    if(digit===" "){
        tileSelected.classList.add("highlight")
        return
    }
    const nums = document.querySelectorAll("td button")
    for (const i of nums) {
        if(i.textContent==digit){
            i.classList.add("highlight")

        }
    }
}



const generateDiagonalSquares = ()=>{
    for (let i = 0; i < 9; i+=4) {
        let nums = [1,2,3,4,5,6,7,8,9]
        for (let j = 0; j < 9; j++) {
            board[i][j]=nums[Math.floor(Math.random()*nums.length)]
            nums = nums.filter(num=>num!==board[i][j])
        } 
    }
}


const generateRemainingSquares = (squareIndex,spaceIndex)=>{
    const remainingSquares = [1,2,3,5,6,7]
    for (let i = 1; i <=9; i++) {
        if(isSolved(board)){
            break
        }
        board[remainingSquares[squareIndex]][spaceIndex] = i
        if(isValid(board)){
            if(spaceIndex===8){
                generateRemainingSquares(squareIndex+1,0)

            }
            else{
                generateRemainingSquares(squareIndex,spaceIndex+1)
            }
        }
        
    }
    if(!isValid(board)){
        board[remainingSquares[squareIndex]][spaceIndex]=0
        return
    }
}

const removeNums = ()=>{
    const selectDifficulty = document.querySelector("select")
    editablePositions=[]
    let numbersRemoved = [30,46,50,58],n1,n2
    for (let i = 0; i < numbersRemoved[selectDifficulty.value]; i++) {
        do{

            n1 = Math.floor(Math.random()*9)
            n2 = Math.floor(Math.random()*9)
        } while(board[n1][n2]===0)
            board[n1][n2]=0
            editablePositions.push([n1,n2])
        
    }
}

const generateBoard = ()=>{
    board = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]
    generateDiagonalSquares()
    generateRemainingSquares(0,0)
    solvedBoard = board
    removeNums()
}

//to determine how many from each digit are needed to complete the game
const getDigitSituation = ()=>{
    const numBtns = document.querySelectorAll("#numbersDiv button")
    for (let i = 1; i <=9; i++) {
        let count = 0
        for (const square of board) {
            for(const num of square){
                if(i===num){
                    count+=1
                }
            }
        }
        if(count===9){
            numBtns[i-1].nextSibling.textContent = ""

        }
        else if(count>9){
            numBtns[i-1].nextSibling.textContent = `${(9-count)*-1}+`
        }
        else{
            numBtns[i-1].nextSibling.textContent = 9-count
        }
        
    }
}