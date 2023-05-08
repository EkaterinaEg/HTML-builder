const fs = require('fs');
const path = require('path');
// const process = require('node:process');
// const { stdin } = process;

const folderPath = '05-merge-styles/styles';
const dir = 'styles';
// const dirForResultFile = 'project-dist';
const resultFileName = 'project-dist/bundle.css';
let writableStream = fs.createWriteStream(
  path.resolve(__dirname, resultFileName)
);
// let readableStream = fs.createReadStream(path.resolve(__dirname, dir, file));

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      fs.stat(path.resolve(__dirname, dir, file), (err, fileStats) => {
        if (err) {
          console.log(err);
        } else {
          if (
            fileStats.isFile() &&
            path.extname(file).split('.')[1] === 'css'
          ) {
            let readableStream = fs.createReadStream(
              path.resolve(__dirname, dir, file)
            );
            readableStream.on('data', (data) => {
              writableStream.write(data);
            });
          }
        }
      });
    });
  }
});
