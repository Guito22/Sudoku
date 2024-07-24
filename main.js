const body = document.body
const localTheme = localStorage.getItem("data-theme")
const themeBtn = document.querySelector("#themeBtn")
const square = document.querySelectorAll("td div")

let tileSelected = undefined;
let btnSelected = undefined;

for (const i of square) {
    for (let j = 0; j < 9; j++) {
        
        const button = document.createElement("button")
        button.textContent = `${j}`
        button.style.fontSize="large"
        i.appendChild(button)
    }
}

if(localTheme){
    body.setAttribute("data-theme",localTheme)
    themeBtn.textContent = localTheme==="light" ? "🔆" : "🌙"
}
else{
    localStorage.setItem("data-theme","light")
    themeBtn.textContent ="🔆"
}
body.addEventListener("click",(e)=>{
    const selected = document.querySelector("#selected")
    if(selected){

        selected.classList.toggle("highlight")
        selected.id=""
        tileSelected = undefined
    }
    const btnhightLighted = document.querySelector("#btnSelected")
    if(btnhightLighted){

        btnhightLighted.classList.toggle("highlight")
        btnhightLighted.id=""
        btnSelected = undefined
    }

})
body.addEventListener("keydown",(e)=>{
    if(e.key>="1" && e.key<="9"){
        e.preventDefault()
        if(tileSelected){
            tileSelected.textContent = e.key
        }
    }
})

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

const boardNumbers = document.querySelectorAll("td button")

for (const i of boardNumbers) {
    i.addEventListener("click",(e)=>{
        e.stopPropagation()
        if(btnSelected){
            const btnhightLighted = document.querySelector("#btnSelected")
            if(btnhightLighted.textContent>="1" && btnhightLighted.textContent<="9"){
                if(i.textContent===btnhightLighted.textContent){
                    i.textContent=" "
                }
                else{
                    i.textContent = btnhightLighted.textContent
                }
            }
            if(btnhightLighted.textContent==="X"){
                i.textContent = " "
            }
            return
        }
        if(tileSelected!==i){

            if(tileSelected!==undefined){
                const selected = document.querySelector(".highlight")
                selected.classList.toggle("highlight")
                selected.id = ""
            }
            tileSelected = i
            i.id = "selected"
        }
        else{
            tileSelected = undefined
            i.id = ""

        }
        i.classList.toggle("highlight")
    })
}

const numbersBtns = document.querySelectorAll("#numbersDiv button")

for (const i of numbersBtns) {
    i.addEventListener("click",(e)=>{
        e.stopPropagation()
        if(btnSelected!==i){
            if(btnSelected!==undefined){
                const selected = document.querySelector("#btnSelected")
                selected.classList.toggle("highlight")
                selected.id=""
            }
            btnSelected = i
            i.id = "btnSelected"
        }
        else{
            btnSelected=undefined
            i.id=""
        }
        i.classList.toggle("highlight")
    })
}