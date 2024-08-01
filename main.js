const body = document.body
let tileSelected = undefined;
let btnSelected = undefined;

createBoardBtns()
createActionBtns()
generateBoard()
fillBoardDisplay()
getDigitSituation()
setTheme()

const newGameBtn = document.querySelector("#newGameBtn")
const selectDifficulty = document.querySelector("select")
const dialog = document.querySelector("dialog")
const closeModal = document.querySelector("#closeModal")

newGameBtn.addEventListener("click",(e)=>{
    e.stopPropagation()
    seconds=minutes=hours=0
    generateBoard()
    fillBoardDisplay()
    getDigitSituation()
    removeHighLight()
})

selectDifficulty.addEventListener("click",(e)=>{
    e.stopPropagation()
})

closeModal.addEventListener("click",(e)=>{
    e.stopPropagation()
    dialog.close()
})

body.addEventListener("click",(e)=>{
    removeHighLight()
    const selected = document.querySelector("#selected")
    tileSelected = undefined
    btnSelected = undefined

    if(selected){
        selected.classList.remove("highlight")

        selected.id=""
    }
    const btnhightLighted = document.querySelector("#btnSelected")
    if(btnhightLighted){

        btnhightLighted.id=""
    }
    

})
body.addEventListener("keydown",(e)=>{
    if(e.key>="1" && e.key<="9"){
        e.preventDefault()
        if(tileSelected){

            if(!tileSelected.hasAttribute("available")){
                return
            }
            if(tileSelected.textContent!=e.key){
                tileSelected.textContent = e.key
                highlightSameDigit(e.key)
                updateBoardArray()
                if(isSolved(board)){
                    dialog.showModal()
                }
            }
            else{
                tileSelected.textContent = " "
                if(btnSelected){
                    btnSelected.classList.add("highlight")
                }
                removeHighLight()
                
            }
        }
        updateBoardArray()
    }
})

const boardNumbers = document.querySelectorAll("td button")

for (const i of boardNumbers) {
    i.addEventListener("click",(e)=>{
        e.stopPropagation()
        
        if(btnSelected){
            const btnhightLighted = document.querySelector("#btnSelected")
            if(btnhightLighted.textContent>="1" && btnhightLighted.textContent<="9"){
                if(i.textContent===btnhightLighted.textContent){
                    i.textContent=" "
                    removeHighLight()
                    btnSelected.classList.add("highlight")

                }
                else{
                    btnSelected.classList.add("highlight")
                    tileSelected = i
                    if(tileSelected.hasAttribute("available")){
                        
                        i.textContent = btnhightLighted.textContent

                        highlightSameDigit(btnSelected.textContent)
                        btnSelected.classList.add("highlight")
                        updateBoardArray()
                        
                        if(isSolved(board)){
                            dialog.showModal()
                        }
                    }

                    
                }
            }
            if(btnhightLighted.textContent==="X"){
                if(i.hasAttribute("available")){

                    i.textContent = " "
                }
                removeHighLight()
                btnSelected = undefined
            }
            updateBoardArray()
            return
        }
        if(tileSelected!==i){

            if(tileSelected!==undefined){
                tileSelected.classList.remove("highlight")
                selected.id = ""
            }
            tileSelected = i
            i.id = "selected"
            highlightSameDigit(i.textContent)
        }
        else{
            tileSelected = undefined
            removeHighLight()
            i.classList.remove("highlight")
            i.id = ""

        }
        updateBoardArray()

    })
}

const numbersBtns = document.querySelectorAll("#numbersDiv button")

for (const i of numbersBtns) {
    i.addEventListener("click",(e)=>{
        e.stopPropagation()
        if(btnSelected!==i){
            if(btnSelected!==undefined){
                btnSelected.classList.toggle("highlight")
                btnSelected.id=""
                if(tileSelected){

                    tileSelected.id=""
                    tileSelected = undefined
                }
            }
            if(tileSelected && i.textContent>=1 && i.textContent<=9){
                if(!tileSelected.hasAttribute("available")){
                    return
                }
                if(tileSelected.textContent===i.textContent){
                    tileSelected.textContent = " "
                }
                else{
                    tileSelected.textContent = i.textContent
                    updateBoardArray()
                    
                    if(isSolved(board)){
                        dialog.showModal()
                    }
                }
            }
            if(tileSelected && i.textContent==="X"){
                if(tileSelected.hasAttribute("available")){

                    tileSelected.textContent = " "
                    i.id = ""
                    tileSelected.classList.remove("highlight")
                    tileSelected.id=""
                    tileSelected=undefined
                    btnSelected=undefined
                    removeHighLight()
                }
                
                return

            }
            btnSelected = i
            i.id = "btnSelected"
            highlightSameDigit(btnSelected.textContent)
        }
        else{
            btnSelected=undefined
            i.id=""
            removeHighLight()
            return
        }
        i.classList.toggle("highlight")
    })
}
