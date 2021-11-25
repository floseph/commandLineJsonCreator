const fs = require('fs')
var readlineSync = require('readline-sync')

// counters purely for more readable prompts
let attributeCounter = 1
let objectCounter = 1
// holds keys / names of the new attributes
const attributes = []
// holds all the objects that will get written to the JSON file
const newObjects = []
// flag to see if empty string was last input during attribute creation stage
let lastPromptEmpty = false

function main(){

  console.log(`\n-+-+- Welcome to the commandLineJsonCreator -+-+-\n
  -1- First enter the names of the new attributes one by one.
  -2- Press "Enter" without inputing any text to see the attributes you already added.
  -3- Press "Enter" again without inputing any text to stop adding new attributes.
  -4- Next press the "y" key at the [y/n] prompt to add a new object.
  -5- Input all values for the attributes of the new object.
  -6- End the program by pressing any other key at the [y/n] prompt\n`)

  // Adds new attributes until user stop input by sending an empty string
  while(true){

    // Reads new attribute name and checks if value is assigned
    const newAttribute = readlineSync.question(`#${attributeCounter} Attribute : `)

    // shows all entered attributes if first empty string response
    // else stops the adding attributes process
    if(!newAttribute) {
      if(lastPromptEmpty) break
      lastPromptEmpty = true
      console.log(attributes)
      continue
    }

    // If newAttribute has a valid value it gets added to the attributes array
    attributes.push(newAttribute)
    attributeCounter++;
    lastPromptEmpty = false
  }
  
  while(true){

    // Prompts user to chosose [y/n] 
    if(!readlineSync.keyInYN(`Want to add object #${objectCounter}?`)) break

    // empty object to be added to json file
    const newObject = {}

    // assign a value for every attribute (empty string possible)
    for(let i = 0; i < attributes.length; i++){

      const newValue = readlineSync.question(`\nObject #${newObjects.length+1}\nKey name : "${attributes[i]}" Enter value : `)
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