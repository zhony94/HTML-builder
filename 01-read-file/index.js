const fs = require('fs');
const path = require('path');

// const link = path.join(__dirname, 'text.txt')

// const stream = new fs.ReadStream(link, {encoding: 'utf-8'})

// stream.on('readable', () => {
//     const data = stream.read();
//     console.log(data)
// });

let readableStream = fs.createReadStream("text.txt", "utf8");
 
readableStream.on("data", function(chunk){ 
    console.log(chunk);
});