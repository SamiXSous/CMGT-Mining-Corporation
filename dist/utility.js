"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayToString = exports.hashLoop = exports.modulus10 = exports.addRemainingCharToArray = exports.setToChar = exports.noWhiteSpaces = void 0;
function noWhiteSpaces(string) {
    let noWhiteSpace = string.replace(/\s+/g, '');
    return noWhiteSpace;
}
exports.noWhiteSpaces = noWhiteSpaces;
function setToChar(string) {
    let ASCIIArray = [];
    for (let i = 0; i < string.length; i++) {
        if (string.charCodeAt(i) == 8203) {
        }
        else {
            // 2. Leters omzetten naar ASCII
            let char = string.charCodeAt(i);
            // Dit zorgt dat alleen letters door ASCII gaat
            if (string[i] >= '0' && string[i] <= '9') {
                char = parseInt(string[i]);
            }
            // 3. Getallen scheiden zodat losse getallen onstaan
            var digits = ("" + char).split("");
            digits.forEach(digit => {
                ASCIIArray.push(parseInt(digit));
            });
        }
    }
    return ASCIIArray;
}
exports.setToChar = setToChar;
function addRemainingCharToArray(ASCIIArray, voudigheid) {
    let ontbrekendeNummers = voudigheid - ASCIIArray.length;
    // 5. Veelvoud van 10 toepassen aan array
    for (let i = 0; i < ontbrekendeNummers; i++) {
        ASCIIArray.push(i);
    }
    return ASCIIArray;
}
exports.addRemainingCharToArray = addRemainingCharToArray;
function modulus10(firstArray, secondArray) {
    let notHigherThan10;
    let array = [];
    for (let inter = 0; inter < 10; inter++) {
        if (secondArray == null) {
            if (firstArray[inter] + firstArray[inter + 10] >= 10) {
                notHigherThan10 = (firstArray[inter] + firstArray[inter + 10]) - 10;
            }
            else {
                notHigherThan10 = (firstArray[inter] + firstArray[inter + 10]);
            }
        }
        else {
            if (firstArray[inter] + secondArray[inter] >= 10) {
                notHigherThan10 = (firstArray[inter] + secondArray[inter]) - 10;
            }
            else {
                notHigherThan10 = (firstArray[inter] + secondArray[inter]);
            }
        }
        array.push(notHigherThan10);
    }
    if (secondArray == null) {
        // Verwijder eerste 20 char uit Array
        for (let i = 0; i < 20; i++) {
            firstArray.splice(0, 1);
        }
    }
    return array;
}
exports.modulus10 = modulus10;
function hashLoop(voudigheid, ASCIIArray, nieuweReeks) {
    for (let i = 0; i < (voudigheid - 20) / 10; i++) {
        let meerDan20 = modulus10(ASCIIArray, nieuweReeks);
        for (let i = 0; i < 10; i++) {
            ASCIIArray.splice(0, 1);
        }
        nieuweReeks = [];
        nieuweReeks = meerDan20;
    }
    return nieuweReeks;
}
exports.hashLoop = hashLoop;
function arrayToString(nieuweReeks) {
    let stringForSha = "";
    nieuweReeks.forEach(nummer => {
        stringForSha = stringForSha + nummer;
    });
    return stringForSha;
}
exports.arrayToString = arrayToString;
