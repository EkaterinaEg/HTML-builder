const { mkdir, unlink, readdir, copyFile } = require('node:fs/promises');
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
const folderToCopyPath = '04-copy-directory/files-copy';
const fromDir = 'files';
const toDir = 'files-copy';

async function copyFiles() {
  const files = await readdir(folderToCopyPath);
  // console.log(`initial: ${files}`);
  for (const file of files) {
    await unlink(path.join(folderToCopyPath, file));
  }

  const items = await readdir(folderFromCopyPath);

  items.forEach((item) => {
    copyFile(
      path.join(__dirname, fromDir, item),
      path.join(__dirname, toDir, item)
    );
  });
}

copyFiles().catch(console.error);
