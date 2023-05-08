const fs = require('fs');
const path = require('path');
const { join } = require('node:path');
const { readdir, copyFile, mkdir } = require('node:fs/promises');

//new
const createdDir = 'project-dist';
const fileHtml = join(__dirname, createdDir, 'index.html');

//move from and what
const template = join(__dirname, 'template.html');
const components = join(__dirname, 'components');
// const dirStyles = "styles";

const assetsDir = 'assets';

// create new directory
async function makeDirectory() {
  const folder = join(__dirname, createdDir);
  const dirCreation = await mkdir(folder, {
    recursive: true,
  });

  return dirCreation;
}
makeDirectory().catch(console.error);

// //create file index.html and put data from template
fs.createReadStream(path.resolve(template), 'utf-8').on('data', (data) => {
  fs.createWriteStream(path.resolve(fileHtml)).write(data);
});
async function createHTML() {
  try {
    fs.createReadStream(path.resolve(template), 'utf-8').on('data', (data) => {
      let page = data.toString();
      fs.readdir(components, (err, files) => {
        if (err) {
          console.log(err);
        } else {
          files.forEach((file) => {
            const fileName = path.basename(`${file}`).split('.')[0];
            const mapper = `{{${fileName}}}`;
            fs.createReadStream(path.resolve(components, file), 'utf-8').on(
              'data',
              (res) => {
                const result = res.toString();
                if (mapper === path.basename(`${file}`).split('.')[0]);
                page = page.replace(mapper, result);
                fs.createWriteStream(path.resolve(fileHtml)).write(page);
              }
            );
          });
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
}

// // create styles files
const dirStyles = 'styles';
const fileStyles = join(__dirname, createdDir, 'style.css');

// let writableStream = fs.createWriteStream(path.resolve(fileStyles));

// async function makeDirectory() {
//   const folder = join(__dirname, createdDir, style);
//   const dirCreation = await mkdir(folder, {
//     recursive: true,
//   });

//   return dirCreation;
// }
// makeDirectory().catch(console.error);
let writableStream = fs.createWriteStream(path.resolve(fileStyles));

async function mergeFiles() {
  try {
    const files = await readdir(path.resolve(__dirname, dirStyles));
    files.forEach(async (file) => {
      fs.stat(path.resolve(__dirname, dirStyles, file), (err, fileStats) => {
        if (err) {
          console.log(err);
        } else {
          if (
            fileStats.isFile() &&
            path.extname(file).split('.')[1] === 'css'
          ) {
            fs.createReadStream(
              path.resolve(__dirname, dirStyles, file),
              'utf-8'
            ).on('data', (data) => {
              writableStream.write(data);
            });
          }
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
}

// move assets folder

// create assets dir
async function makeDirectoryAssets() {
  const folder = join(__dirname, createdDir, assetsDir);
  const dirCreation = await mkdir(folder, {
    recursive: true,
  });

  return dirCreation;
}
makeDirectoryAssets().catch(console.error);

// copy assets
async function copyDirectory(from, to) {
  const files = await readdir(from, { withFileTypes: true });

  // console.log(file);
  files.forEach(async (file) => {
    const { name } = file;
    if (file.isFile()) {
      // console.log(file);
      copyFile(path.join(from, name), path.resolve(to, name));
    } else {
      // console.log(`dir: ${name}`);

      mkdir(path.join(to, name), { recursive: true });
      copyDirectory(path.join(from, name), path.join(to, name));
    }
  });
}

createHTML();
mergeFiles();
copyDirectory(
  path.resolve(__dirname, assetsDir),
  path.resolve(__dirname, createdDir, assetsDir)
).catch(console.error);
