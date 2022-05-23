const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname)
const projectDistFolderPath = path.join(__dirname, 'project-dist')
const assetsFolderPath = path.join(__dirname, 'assets')
const assetsCopyFolderPath = path.join(projectDistFolderPath, 'assets')

//check and create folder 'project-dist'

fs.stat(projectDistFolderPath, function(err) {
    if (!err) {
    console.log('project-dist directory exists\ncopying missing files');
    }
    else if (err.code === 'ENOENT') {
    console.log('project-dist does not exist\nfolder is created\ncopying files');
    fs.mkdir(projectDistFolderPath, (err) => {
        if(err){
            return console.error(err)
        }
    })
    }
});

//copy assets folder

function copyDir (folderPath, copyFolderPath) {
    fs.rm(copyFolderPath, { recursive: true, force: true }, (err) => {
      if (err) {
        return console.error(err);
      }
  
      fs.mkdir(copyFolderPath, { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
      });
  
      fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
        if (err) {
          return console.error(err);
        }
  
        files.forEach((file) => {
          const filePath = path.join(folderPath, file.name);
          const copyFilePath = path.join(copyFolderPath, file.name);
  
          if (file.isFile()) {
            fs.copyFile(filePath, copyFilePath, (err) => {
              if (err) {
                return console.error(err);
              }
            });
          }
  
          if (file.isDirectory()) {
            copyDir(filePath, copyFilePath);
          }
        });
      });
    });
};  

copyDir(assetsFolderPath, assetsCopyFolderPath);

// combine styles

const stylesFolderPath = path.join(__dirname, 'styles');

fs.access(path.join(__dirname, 'project-dist', 'style.css'), function(err){
    if(err){
        combineStyles();
    }else{
        fs.rm(path.join(__dirname, 'project-dist', 'style.css'), function(err){
            if(err){
                return console.error(err)
            }
            combineStyles();
        })
    }
    
})

function combineStyles() {
    const stream = new fs.WriteStream(path.join(__dirname, 'project-dist', 'style.css'), {'flags': 'a'});
    fs.readdir(stylesFolderPath, {withFileTypes:true}, function(err, items){
        items.forEach(element => {
            if(element.isFile()){
                const filePath = path.join(stylesFolderPath, element.name)
                const fileExt = path.extname(filePath).slice(1);
    
                if(fileExt === 'css'){
                    const readableStream = fs.createReadStream(filePath, "utf8");
                    readableStream.on("data", function(chunk){ 
                        stream.write(chunk + '\n\n')
                    });
                }
            }
        });
        console.log('All styles have been copied to style.css')
    })
}
