const fs = require('fs');
const path = require('path');

const stream = new fs.WriteStream(path.join(__dirname, "hello.txt"));
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

rl.write('Enter text:\n');
rl.on('line', data => {
    let check = data.toString();
    if(check.trim() === 'exit'){
      rl.write("Goodbye, Typed text was saved to hello.txt")
      process.exit()
    }else{
      stream.write(`${data}\n`)
    }
})

rl.on('close', () => {
  rl.write("Goodbye, Typed text was saved to hello.txt")
  process.exit()
});

