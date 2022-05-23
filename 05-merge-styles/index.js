const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'styles');

fs.access(path.join(__dirname, 'project-dist', 'bundle.css'), function(err){
    if(err){
        combineStyles();
    }else{
        fs.rm(path.join(__dirname, 'project-dist', 'bundle.css'), function(err){
            if(err){
                return console.error(err)
            }
            combineStyles();
        })
    }
    
})

function combineStyles() {
    const stream = new fs.WriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), {'flags': 'a'});
    fs.readdir(folderPath, {withFileTypes:true}, function(err, items){
        items.forEach(element => {
            if(element.isFile()){
                const filePath = path.join(folderPath, element.name)
                const fileExt = path.extname(filePath).slice(1);
    
                if(fileExt === 'css'){
                    const readableStream = fs.createReadStream(filePath, "utf8");
                    readableStream.on("data", function(chunk){ 
                        stream.write(chunk + '\n\n')
                    });
                }
            }
        });
        console.log('All styles have been copied to bundle.css')
    })
}



