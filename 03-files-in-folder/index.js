// const fs = require("node:fs/promises");
const fs = require('fs');
const path = require('path');

const folderPath = '03-files-in-folder/secret-folder';
const dir = 'secret-folder';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      //   console.log(file);
      fs.stat(path.resolve(__dirname, dir, file), (err, fileStats) => {
        if (err) {
          console.log(err);
        } else {
          if (fileStats.isFile()) {
            console.log(
              path.basename(file).split('.')[0] +
                ' - ' +
                path.extname(file).split('.')[1] +
                ' - ' +
                fileStats.size / 1024 +
                ' kb'
            );
          }
        }
        //   console.log(fileStats.isFile());
      });
    });
  }
});
//   }
// });

// fs.readdir(folderPath).map((fileName) => {
//   return path.join(folderPath, fileName);
// });
