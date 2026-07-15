import { fileURLToPath } from 'node:url'
import { parser } from '../parser/parser.js'
import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { buildTree } from '../parser/buildTree.js'
import { generate } from '../parser/generate.js'
import { TemplateNotFoundError } from '../errors/RootiError.js'

const TEMPLATES = ['angular', 'nodejs', 'nest', 'vue']

export async function build(template, options) {
  const existsTemplate = TEMPLATES.some(
    (t) => t.toLowerCase() === template.toLowerCase(),
  )

  let contentFile
  if (existsTemplate) {
    contentFile = await chooseTemplate(template)
  } else {
    contentFile = await openFile(template)
  }
  const tokens = await parser(contentFile, options)
  const tree = buildTree(tokens, options)
  const outDirectory = options.output
    ? join(process.cwd(), options.output)
    : process.cwd()
  await generate(tree, outDirectory)
}

async function chooseTemplate(template) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)

  switch (template.toLowerCase()) {
    case 'angular':
      return await readFile(
        join(__dirname, '../templates/angular.rooti'),
        'utf8',
      )
    case 'nodejs':
      return await readFile(join(__dirname, '../templates/nodejs.rooti'), 'utf8')
    case 'nest':
      return await readFile(join(__dirname, '../templates/nest.rooti'), 'utf8')
    case 'vue':
      return await readFile(join(__dirname, '../templates/vue.rooti'), 'utf8')
    default:
      return await readFile(
        join(__dirname, '../templates/default.rooti'),
        'utf8',
      )
  }
}

async function openFile(file) {
  try {
    return await readFile(file, 'utf8')
  } catch {
    throw new TemplateNotFoundError(file)
  }
}
