const isRepeated = (numbers)=>{
    for (let i=0;i<numbers.length;i++) {
        const others = numbers.toSpliced(i,1)
        const aux= others.every((number)=>number!==numbers[i] || number===0)
        if(!aux){
            return true
        }
    }
    return false
}

const checkRows = (gameBoard)=>{
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const row = []
            for (let k = 0; k < 3; k++){
                row.push(...gameBoard[(i*3)+k].slice(j*3,(j*3)+3))
                
            }
            if(isRepeated(row)){
                return false
            }
        }
        
    }
    return true
}

const checkColumns = (gameBoard)=>{
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const column = []
            for (let k = 0; k < 3; k++){
                column.push(gameBoard[(k*3)+i][0+j])
                column.push(gameBoard[(k*3)+i][3+j])
                column.push(gameBoard[(k*3)+i][6+j])
                
            }
            if(isRepeated(column)){
                return false
            }
        }
        
    }
    return true
}

const checkSquares = (gameBoard)=>{
    return !gameBoard.some(isRepeated)
}
const isBoardFull = (gameBoard)=>{
    return gameBoard.every((i)=>!i.includes(0))
}

const isValid = (gameBoard)=>{
    return checkColumns(gameBoard) 
    && checkRows(gameBoard)
    && checkSquares(gameBoard)
}

const isSolved = (gameBoard)=>{

    return checkColumns(gameBoard) 
    && checkRows(gameBoard)
    && checkSquares(gameBoard)
    && isBoardFull(gameBoard)
}

