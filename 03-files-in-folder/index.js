const fs = require('fs');
const { type } = require('os');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, {withFileTypes:true}, function(err, items){
    items.forEach(element => {
        if(element.isFile()){
            const fileName = element.name.split('.').slice(0,-1).join('.');
            const filePath = path.join(__dirname, 'secret-folder', element.name)
            const fileExt = path.extname(filePath).slice(1);

            fs.stat(filePath, function(err, stats){
                let fileSize = stats.size / 1024
                console.log(fileName + ' - ' + fileExt + ' - ' + fileSize + 'kb');
            })
            
        }
        
    });
})