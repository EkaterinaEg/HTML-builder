const process = require('node:process');
const fs = require('fs');
const { stdin, stdout } = process;

stdout.write('How are you today?\n');

let writableStream = fs.createWriteStream('./02-write-file/message.txt');

stdin.on('data', (data) => {
  const input = data.toString();
  if (input.trim() === 'exit') {
    console.log('Have a good day!');
    process.exit();
  } else {
    writableStream.write(input);
    writableStream.on('error', (err) => console.log(err));
  }
});
process.on('SIGINT', () => {
  console.log('Have a good day!');
  process.exit();
});
