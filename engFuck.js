const process = require('process')
var input = process.argv[2].split("")
var output = ""
var value = 0
var chars = 'abcdefghijklmnopqrstuvwxyz{}()\'"` .,'.split('')

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

eval(output)
