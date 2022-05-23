const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'files');
const copyFolderPath = path.join(__dirname, 'files-copy');

fs.stat(copyFolderPath, function(err) {
    if (!err) {
    console.log('files-copy directory exists\ncopying missing files');
    }
    else if (err.code === 'ENOENT') {
    console.log('files-copy does not exist\nfolder is created\ncopying files');
    fs.mkdir(copyFolderPath, (err) => {
        if(err){
            return console.error(err)
        }
    })
    }
});

fs.readdir(folderPath, {withFileTypes:true}, function(err, items){
    items.forEach(element => {
        if(element.isFile()){
            const filePath = path.join(folderPath, element.name)
            const copyFilePath = path.join(copyFolderPath, element.name)

            fs.copyFile(filePath, copyFilePath, function(err){
                if(err){
                    return console.error(err)
                }
            })   
        }  
    });
    console.log('all files have been copied succesfully')
})

