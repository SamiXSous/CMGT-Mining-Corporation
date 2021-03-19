export function noWhiteSpaces(string: String){
    let noWhiteSpace = string.replace(/\s+/g, '')
    return noWhiteSpace
}

export function setToChar(string: String){
    let ASCIIArray = []
    for (let i = 0; i < string.length; i++)
    {
        if(string.charCodeAt(i) == 8203){

        } else {
            // 2. Leters omzetten naar ASCII
            let char = string.charCodeAt(i)
            // Dit zorgt dat alleen letters door ASCII gaat
            if(string[i] >= '0' && string[i] <= '9'){
                char = parseInt(string[i])
            }
            // 3. Getallen scheiden zodat losse getallen onstaan
            var digits = ("" + char).split("");
                digits.forEach(digit => {
                ASCIIArray.push(parseInt(digit))
            })
        }
    }
    return ASCIIArray
}

export function addRemainingCharToArray(ASCIIArray, voudigheid){
    let ontbrekendeNummers = voudigheid - ASCIIArray.length
    // 5. Veelvoud van 10 toepassen aan array
    for (let i = 0; i < ontbrekendeNummers; i++){
        ASCIIArray.push(i)
    }
    return ASCIIArray
}

// Recursive functions
export function modulus10(firstArray, secondArray = []) {
    let notHigherThan10
    if(firstArray.length == 0){
        return secondArray
    } else {
        if(secondArray.length < 10){
            notHigherThan10 = (firstArray[0] + firstArray[firstArray.length/2])
           
            firstArray.splice(0,1)
            firstArray.splice(firstArray.length/2,1)

        } else {
            notHigherThan10 = (firstArray[0] + secondArray[0])
            
            firstArray.splice(0,1)
            secondArray.splice(0,1)
        }
        if(notHigherThan10 >= 10){
            notHigherThan10 -= 10
        }
        secondArray.push(notHigherThan10)
        return modulus10(firstArray, secondArray)
    }
}

export function hashLoop (voudigheid, ASCIIArray, nieuweReeks) {
    for (let i =0; i < (voudigheid - 20)/ 10; i++){
        let meerDan20 = modulus10(ASCIIArray, nieuweReeks)
        for (let i = 0; i < 10; i++){
            ASCIIArray.splice(0,1)
        } 
        nieuweReeks = []
        nieuweReeks = meerDan20
    }
    return nieuweReeks
}

export function arrayToString (nieuweReeks) {
    let stringForSha = ""
    nieuweReeks.forEach(nummer => {
        stringForSha = stringForSha+nummer
    });
    return stringForSha
}