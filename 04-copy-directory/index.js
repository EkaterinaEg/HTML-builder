const { mkdir } = require('node:fs/promises');
const fs = require('fs');
const { join } = require('node:path');
const path = require('path');

async function makeDirectory() {
  const folder = join(__dirname, 'files-copy');
  const dirCreation = await mkdir(folder, {
    recursive: true,
  });

  return dirCreation;
}
makeDirectory().catch(console.error);

const folderFromCopyPath = '04-copy-directory/files';
const fromDir = 'files';
const toDir = 'files-copy';
fs.readdir(folderFromCopyPath, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      fs.copyFile(
        path.resolve(__dirname, fromDir, file),
        path.resolve(__dirname, toDir, file),
        (err) => {
          if (err) throw err;
          console.log('succesfully');
        }
      );
    });
  }
});
