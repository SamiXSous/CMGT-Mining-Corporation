import {mod10Hash} from '../dev/mod10Hash';
import {noWhiteSpaces, setToChar, modulus10, hashLoop, addRemainingCharToArray, arrayToString} from '../dev/utility';
import {expect} from 'chai';

describe('Mod10Hash Unit Testing', () => {
  it('Stap 1: Checks if noWhiteSpaces function works', () => {
    let spaceString = 'd    sfoj o ds gs d '+9;
    let demoSpace = "00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cf​CMGTMining Corporation​Bas BOOTB​1​1548747733261​1548748101396​3926";
    // Expect before function
    expect(spaceString).to.include(' ');
    expect(demoSpace).to.include(' ');

    let noSpace = noWhiteSpaces(spaceString)
    let demoNoSpace = noWhiteSpaces(demoSpace)
    // Expect after function
    expect(noSpace).not.to.include(' ');
    expect(demoNoSpace).not.to.include(' ');
  })

  it('Stap 2 + 3: Checks if String is converted to array of char', () => {
    let text = 'text'
    let array = setToChar(text)
    expect(array).to.be.an('array')
    expect(array).to.be.eql([1, 1, 6, 1, 0,1, 1, 2, 0, 1, 1, 6])
  })

  it('Add remaining numbers to array to roud to 10', () => {
    let array = []
    let result = addRemainingCharToArray(array, 10)

    expect(result).to.be.eql([0,1,2,3,4,5,6,7,8,9])
  })

  it('Stap 4: Modulus10Hash', () => {
    let array1 = [0,1,2,3,4,5,6,7,8,9]
    let array2 = [9,8,7,6,5,4,3,2,1,0]
    let result = modulus10(array1, array2)

    expect(result).to.be.an('array')
    expect(result).to.be.eql([9, 9, 9, 9, 9,9, 9, 9, 9, 9])
    expect(result.length).to.be.equal(10)

    array1 = [6,6,6,6,6,6,6,6,6,6,6,6]
    array2 = [6,6,6,6,6,6,6,6,6,6,6,6]

    result = modulus10(array1, array2)
    expect(result).to.be.an('array')
    expect(result).to.be.eql([2,2,2,2,2,2,2,2,2,2])
    expect(result.length).to.be.equal(10)
  })

  it('Stap 5 + 6: Modulus10HashLoop', () => {
    let voudigheid = 200
    let ASCIIArray = [9,7,4,1,0,0,6,7,9,8,0,0,2,2,9,7,3,0,9,8,9,7,9,7,1,0,2,2,5,1,0,1,9,7,9,7,2,3,1,1,0,2,8,9,9,1,9,8,1,0,8,1,0,1,2,6,2,4,1,0,2,0,5,2,1,0,2,3,1,0,2,8,6,7,7,7,7,1,8,4,7,7,1,0,5,1,1,0,1,0,5,1,1,0,1,0,3,6,7,1,1,1,1,1,4,1,1,2,1,1,1,1,1,4,9,7,1,1,6,1,0,5,1,1,1,1,1,0,6,6,1,1,1,9,8,8,0,7,3,7,5,6,5,6,6,1,1,5,4,8,6,8,9,5,1,3,8,5,8,1,5,4,8,7,4,7,7,8,8,7,1,6,1,0,3,1,2,0,1,2]
    let nieuweReeks = [9,0,3,8,5,5,5,6,4,1]

    let result = hashLoop(voudigheid, ASCIIArray, nieuweReeks)
    let equal = [1, 6, 5, 7, 5, 3, 3, 8, 4, 7 ]

    expect(result).to.be.eql(equal)
    expect(result.length).to.be.equal(10)

    ASCIIArray = [1,0,0,6,5,4,9,8,5,3,0,9,9,7,7,7,0,3,5,0,9,8,1,0,2,9,8,4,9,9,1,0,2,4,9,1,7,1,9,9,6,8,2,3,3,0,9,7,2,1,0,1,9,9,9,9,9,9,9,8,1,0,2,1,0,0,8,8,5,3,9,9,1,0,2,6,7,7,7,7,1,8,4,7,7,1,0,5,1,1,0,1,0,5,1,1,0,1,0,3,6,7,1,1,1,1,1,4,1,1,2,1,1,1,1,1,4,9,7,1,1,6,1,0,5,1,1,1,1,1,0,6,6,9,7,1,1,5,6,6,7,9,7,9,8,4,6,6,1,1,5,4,8,7,4,7,7,3,3,2,6,1,1,5,4,8,7,4,8,1,0,1,3,9,6,3,9,2,6,0]
    nieuweReeks = [0,9,9,1,5,2,7,7,3,0]

    result = hashLoop(voudigheid, ASCIIArray, nieuweReeks)
    equal = [5,8,7,4,6,6,0,4,8,7]

    expect(result).to.be.eql(equal)
    expect(result.length).to.be.equal(10)
  })

  it('Stap 7: Array to string', () => {
    let array = [0,4,2,3,4,4,2,4]
    let string = arrayToString(array)

    expect(string).to.be.equal('04234424')
  })

  it('mod10Hash "text" String check!', () => {
    let hash = mod10Hash('text')
    expect(hash).to.be.a('string')
    expect(hash).to.equal('d0b3cb0cc9100ef243a1023b2a129d15c28489e387d3f8b687a7299afb4b5079')
  })

  it('mod10Hash Fully Complete', () => {
    let hash
    hash = mod10Hash("000078454c038871fa4d67b0022a30baaf25eaa231f8991b108e2624f052f3f8​CMGTMining Corporation​Bob PIKAB​​11548689513858​1548747788716​10312")
    expect(hash).to.be.equal("00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cf")

    hash = mod10Hash("00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cf​CMGTMining Corporation​Bas BOOTB​1​1548747733261​1548748101396​3926")
    expect(hash).to.be.equal("000068fe4cbbe34a1efaffb8959758fde8da0bdb82aad9e8b78815a22823afd4")
  })
})