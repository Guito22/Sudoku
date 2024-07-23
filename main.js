const localTheme = localStorage.getItem("data-theme")
const themeBtn = document.querySelector("#themeBtn")

if(localTheme){
    document.body.setAttribute("data-theme",localTheme)
    themeBtn.textContent = localTheme==="light" ? "🔆" : "🌙"
}
else{
    localStorage.setItem("data-theme","light")
    themeBtn.textContent ="🔆"
}


themeBtn.addEventListener("click",()=>{
    if(document.body.getAttribute("data-theme")==="light"){
        document.body.setAttribute("data-theme","dark")
        localStorage.setItem("data-theme","dark")
        themeBtn.textContent ="🌙"

    }
    else{
        document.body.setAttribute("data-theme","light")
        localStorage.setItem("data-theme","light")
        themeBtn.textContent ="🔆"

    }
})