#!/usr/bin/env node

let fs=require('fs');
let path=require('path');

(function(){
    //returns the name of the current working directory
    let cmd=process.cwd();
    //open directory in the file system
    const dir = fs.opendirSync(cmd)
    //object with file names
    let dirent
    //readsync is used to check if there are files in the directory
    while ((dirent = dir.readSync()) !== null) {
    //file names are filled in the array
    let content=dirent.name.split('.')
    //checking if the folder with extension exist or not
    //content[1] is the extension of the file in the content array
    if(fs.existsSync(`${cmd}//${content[1]}`)){
        //cmd current path
        //dirent.name is the filename
        //content[1] the folder name
        moveFile(cmd,dirent.name,`${content[1]}`)
    }else{
        //making the folder
        fs.mkdirSync(`${cmd}//${content[1]}`)
        moveFile(cmd,dirent.name,`${content[1]}`)
    }
    }
    dir.closeSync()
})();

function moveFile(directory,filename,newfolder){
    // current path 
    const currentPath = path.join(directory, filename)
    //new path
    const newPath = path.join(directory, newfolder, filename)
    console.log(newPath);
    try {
        //rename the file from old path to the new path
        fs.renameSync(currentPath, newPath)
        console.log("Successfully moved the file!")
      } catch(err) {
        console.log(err)
      }
}