const timepassed = document.querySelector("#time")
let seconds=0,minutes=0,hours=0
const setTime = async ()=>{
    return new Promise((resolve, reject) => {
        setInterval(()=>{
            if(isSolved(board)){
                return
            }
            seconds+=1
            if(seconds===60){
                seconds=0
                minutes+=1
                if(minutes===60){
                    minutes=0
                    hours+=1
                }
            }
            timepassed.textContent=""
            if(hours>0){
                timepassed.textContent+=`${hours}h `
            }
            if(minutes>0){
                timepassed.textContent+=`${minutes}m `
            }
            if(seconds>0){
                timepassed.textContent+=`${seconds}s `
            }
            
            resolve("yes")
        },1000)
    })
}

setTime()