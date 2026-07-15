import { cac } from 'cac'
import { build } from '../src/commands/index.js'
import { RootiError } from '../src/errors/RootiError.js'

const cli = cac('rooti')

cli
  .command(
    'build <template>',
    'Create a folder and file structure using a predefined template.',
  )
  .option('--verbose', 'Show detailed error information.')
  .option(
    '--no-strict',
    'It allows you to be more lax in terms of bleeding in the template structure.',
  )
  .option('--output <dir>', 'Allows you to select an exit route.')
  .action(async (template, options) => {
    try {
      await build(template, options)
    } catch (e) {
      if (e instanceof RootiError) {
        console.error(`Error: ${e.message}`)
        if (options.verbose) {
          console.error(e.stack)
        }
      } else {
        console.error(`Error: ${e.message}`)
        console.error(e.stack)
      }
      process.exitCode = 1
    }
  })

cli.help()

try {
  cli.parse()
} catch (e) {
  console.log(e.message)
}
