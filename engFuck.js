const process = require('process')
const readline = require("readline");
const pathM = require('path')
const fs = require('fs')
const path = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

var output = ""
var value = 0
var chars = 'abcdefghijklmnopqrstuvwxyz{}()\'"` .,'.split('')



path.question("Path to .ef file: ", (test) => {
    var fullPath = pathM.join(__dirname, test)
    var input = fs.readFileSync(fullPath, 'utf8').split("")
    console.info(`Compiling your EngFuck file to JavaScript, please be patient...`)

    for (var i = 0; i < input.length; i++) {

        if (input[i] === "+") value++
    
        if (input[i] === "-") value--
    
        if (input[i] == "^") {
            if (value < 1 || value > output.length) {
                value = 0
                return;
            }
    
            output = output.substring(0, value - 1) + output[value - 1].toUpperCase() + output.substring(value, output.length)
        }
    
        if (input[i] === "=") {
            let char = chars[value - 1] ?? "#"
            output += char
            value = 0
        }
    }

    fs.writeFileSync('output.js', output);

    console.info('Finished compiling, run code?')
    path.question("Y/N: ", (test) => {
        if (test === 'Y') {
            var data = fs.readFileSync('output.js', 'utf-8')
            eval(data)
            path.close()
        } else {
            console.info('N selected, exiting compiler...')
            path.close()
        }
    })
})

