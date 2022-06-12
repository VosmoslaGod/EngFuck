const { Command } = require('commander');
const fs = require('fs')
const path = require('path')
const program = new Command()

program
    .name('EngFuck interpreter')
    .description('CLI interface to interpret EngFuck')
    .version('0.1.0')

program.command('compile')
    .description('Compile a .ef file into .js')
    .argument('<fileName>')
    .option('-o, --output <fileName>')
    .action((str, options) => {
        const limit = options.first ? 1 : undefined;
        var opts = {
            fullPath: path.join(__dirname, str),
            chars: 'abcdefghijklmnopqrstuvwxyz{}()\'"+-=` .,'.split(''),
            vals: '0123456789'.split(''),
            value: 0,
            output: '',
        }

        const input = fs.readFileSync(opts.fullPath, 'utf8').split("")
        if (options.output === undefined) {
            console.log('Must have an output name!')
            return
        } 
            const outputFn = options.output.toString()

        
        for (var i = 0; i < input.length; i++) {

            if (input[i] === "+") opts.value++
        
            if (input[i] === "-") opts.value--
        
            if (input[i] == "^") {
                if (opts.value < 1 || opts.value > opts.output.length) {
                    opts.value = 0
                    return;
                }
        
                output = opts.output.substring(0, opts.value - 1) + opts.output[opts.value - 1].toUpperCase() + opts.output.substring(opts.value, opts.output.length)
            }
    
            if (input[i] === "#") {
                let val = opts.vals[opts.value] ?? '0'
                opts.output += val
                opts.value = 0
            }
        
            if (input[i] === "=") {
                let char = opts.chars[opts.value - 1] ?? "#"
                opts.output += char
                opts.value = 0
            }
        }
    
        fs.writeFileSync(outputFn+'.js' ?? 'output', opts.output);
    });

program.parse();
