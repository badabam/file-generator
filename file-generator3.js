const fs = require('fs')

const name = process.argv[2]

fs.writeFileSync(`./${name}.js`,
`function ${name} () {

}
`)
