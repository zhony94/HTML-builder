const fs = require('fs');
const path = require('path');

const stream = new fs.WriteStream(path.join(__dirname, "hello.txt"));

const {stdin, stdout} = process;


stdout.write('Enter text:\n');
stdin.on('data', data => {
    let check = data.toString();
    if(check.trim() === 'exit'){
        process.exit()
    }else{
        stream.write(data)
    }
    
})
process.on('exit', ()=> stdout.write("Typed text was saved to hello.txt"))

