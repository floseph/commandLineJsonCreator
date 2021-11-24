const fs = require('fs')
const path = require('path')
var readlineSync = require('readline-sync')

// counters purely for more readable prompts
let attributeCounter = 1
let objectCounter = 0
// holds keys / names of the new attributes
const attributes = []
// holds all the objects that will get written to the JSON file
const newObjects = []

function main(){

  console.log('\n\nKeep entering the names of new attributes. \nOnce done press "Enter" without inputing any text\n\n')

  // Adds new attributes until user stop input by sending an empty string
  while(true){

    // Reads new attribute naem and checks if value is assigned
    const newAttribute = readlineSync.question(`#${attributeCounter} Attribute : `)
    if(!newAttribute) break

    // If newAttribute has a valid value it gets added to the attributes array
    attributes.push(newAttribute)
    attributeCounter++;
  }
  
  while(true){

    // Prompts user to chosose [y/n] 
    if(!readlineSync.keyInYN(`Want to add object #${objectCounter+1}?`)) break

    
    const newObject = {}

    for(let i = 0; i < attributes.length; i++){

      const newValue = readlineSync.question(`Object #${newObjects.length+1}\nKey name : "${attributes[i]}" Enter value : `)
      newObject[attributes[i]] = newValue
      
    }

    newObjects.push(newObject)
    objectCounter++;
  }

  // stringfies + parses the file to product.json
  const newJson = JSON.stringify(newObjects, null, 2)
  fs.writeFileSync(path.join('product.json'),newJson)
  console.log("\n\nYour .JSON file is now available at './product.json'\n\n")
}


// executes the "main" function lol
main()