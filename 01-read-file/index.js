const fs = require('fs');
const path = require('path');

const link = path.join(__dirname, 'text.txt')

let readableStream = fs.createReadStream(link, "utf8");
 
readableStream.on("data", function(chunk){ 
    console.log(chunk);
});