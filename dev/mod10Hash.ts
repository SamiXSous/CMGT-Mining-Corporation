import { sha256 } from 'js-sha256';
import {noWhiteSpaces, setToChar, modulus10, hashLoop, addRemainingCharToArray, arrayToString} from './utility';

export function mod10Hash(hash: String){
  // 1. Haalt alle spaties uit de String
  let noWhiteSpace = noWhiteSpaces(hash)
  
  // 2 + 3. Set to Char Array
  let ASCIIArray = setToChar(noWhiteSpace)
  let nieuweReeks = []
  
  // Add remaining numbers to array to roud to 10
  let voudigheid = Math.ceil(ASCIIArray.length / 10) * 10;
  addRemainingCharToArray(ASCIIArray, voudigheid)
  
  // 4. 
  nieuweReeks = modulus10(ASCIIArray)

  // 5 + 6. 
  nieuweReeks = hashLoop(voudigheid, ASCIIArray, nieuweReeks)

  // 7. 
  let stringForSha = arrayToString(nieuweReeks)

  // 8.
  let shaHash = sha256(stringForSha)
  return shaHash
}

