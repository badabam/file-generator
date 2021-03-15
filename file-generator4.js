const fs = require('fs')
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What files do you want to create? ', (answer) => {
  answer.split(',').map(n => n.trim()).forEach(writeFile)
  rl.close();
});


function writeFile(name) {
  fs.writeFileSync(`./${name}.js`,
  `function ${name} () {

  }
  `)
}
