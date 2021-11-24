const fs = require('fs')
var readlineSync = require('readline-sync')

// counters purely for more readable prompts
let attributeCounter = 1
let objectCounter = 0
// holds keys / names of the new attributes
const attributes = []
// holds all the objects that will get written to the JSON file
const newObjects = []

function main(){

  console.log(`\n-+-+- Welcome to the commandLineJsonCreator -+-+-\n
  -1- First enter the names of the new attributes one by one.
  -2- Once you've added all your attributes, press "Enter" without inputing any text.
  -3- Next press the "y" key at the [y/n] prompt to add a new object.
  -4- Input all values for the attributes of the new object.
  -5- End the program by pressing any other key at the [y/n] prompt\n
  testing massive gitstuff`)

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

    // empty object to be added to json file
    const newObject = {}

    // assign a value for every attribute (empty string possible)
    for(let i = 0; i < attributes.length; i++){

      const newValue = readlineSync.question(`Object #${newObjects.length+1}\nKey name : "${attributes[i]}" Enter value : `)
      newObject[attributes[i]] = newValue
      
    }

    newObjects.push(newObject)
    objectCounter++;
  }

  // stringifies + parses the file to product.json
  const newJson = JSON.stringify(newObjects, null, 2)
  fs.writeFileSync('product.json', newJson)
  console.log("\nYour .JSON file is now available at './product.json'\n")
}


main()