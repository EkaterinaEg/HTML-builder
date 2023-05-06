const path = require('path');
const process = require('node:process');
const fs = require('fs');

const { exit } = process;

const file = '01-read-file/text.txt';
const fullPath = path.resolve(file);
let stream = fs.createReadStream(fullPath);
stream.on('data', (data) => {
  console.log(data.toString());
  exit();
});
