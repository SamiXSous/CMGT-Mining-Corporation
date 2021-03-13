"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mod10Hash = void 0;
const js_sha256_1 = require("js-sha256");
const utility_1 = require("./utility");
function mod10Hash(hash) {
    // 1. Haalt alle spaties uit de String
    let noWhiteSpace = utility_1.noWhiteSpaces(hash);
    // 2 + 3. Set to Char Array
    let ASCIIArray = utility_1.setToChar(noWhiteSpace);
    let nieuweReeks = [];
    // Add remaining numbers to array to roud to 10
    let voudigheid = Math.ceil(ASCIIArray.length / 10) * 10;
    utility_1.addRemainingCharToArray(ASCIIArray, voudigheid);
    // 4. 
    nieuweReeks = utility_1.modulus10(ASCIIArray);
    // 5 + 6. 
    nieuweReeks = utility_1.hashLoop(voudigheid, ASCIIArray, nieuweReeks);
    // 7. 
    let stringForSha = utility_1.arrayToString(nieuweReeks);
    // 8.
    let shaHash = js_sha256_1.sha256(stringForSha);
    return shaHash;
}
exports.mod10Hash = mod10Hash;
