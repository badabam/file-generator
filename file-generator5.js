const fs = require('fs')
const inquirer = require('inquirer')

const templates = {
  component: name =>
    `
  export default function ${name} () {
    return <div>${name}</div>
  }
  `,

  spec: name =>
    `import {render, screen} from '@testing-library/react'
  describe('${name}', () => {
    it('renders', () => {
      render(<${name} />)
      expect(screen.getByText('${name}')).toBeInTheDocument()
    })
  })
  `,
  stories: name =>
    `
    import ${name} from './${name}'
    export default {
      title: '${name}',
      component: ${name},
    }

    const Template = args => <${name} {...args} />

    export const Primary = Template.bind({})
    Primary.args = {}
  `,
}

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: "What's the name of your component?",
    },
    {
      type: 'checkbox',
      message: 'Select file types',
      name: 'fileTypes',
      choices: [
        {
          name: 'component',
        },
        {
          name: 'spec',
        },
        {
          name: 'stories',
        },
      ],
      validate: function (fileTypes) {
        if (fileTypes.length < 1) {
          return 'You must choose at least one topping.'
        }
        return true
      },
    },
  ])
  .then(({ name, fileTypes }) => {
    fileTypes.forEach(fileType => {
      const fileString = templates[fileType](name)
      writeFile(name, fileType, fileString)
    })
  })

function writeFile(name, fileType, fileString) {
  const fileName =
    fileType === 'component' ? `./${name}.js` : `./${name}.${fileType}.js`
  fs.writeFileSync(fileName, fileString)
}
