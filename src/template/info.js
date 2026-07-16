import { readFile, stat, access } from 'node:fs/promises'
import { parser } from '../parser/parser.js'
import { buildTree } from '../parser/buildTree.js'
import { printTree } from '../parser/printTree.js'
import { getTemplatePath, validateName, getRootiTemplatePath } from './utils.js'
import { TemplateNotFoundError } from '../errors/RootiError.js'
import { message } from '../utils/message.js'

export async function info(templateName) {
  validateName(templateName)
  let templatePath
  try {
    templatePath = await openTemplate(templateName)
    const stats = await stat(templatePath)
    const content = await readFile(templatePath, 'utf8')

    const tokens = await parser(content, { strict: false })
    const tree = buildTree(tokens, { strict: false })

    message(`Name: ${templateName}`)
    message(`Path: ${templatePath}`)
    message(`Size: ${stats.size} bytes`)
    message(`Modified: ${stats.mtime.toISOString().split('T')[0]}`)

    printTree('Content:')(tree)
  } catch (e) {
    if (e instanceof TemplateNotFoundError) throw e
    throw new TemplateNotFoundError(templateName)
  }
}

async function openTemplate(templateName) {
  const builtInPath = getRootiTemplatePath(templateName)
  try {
    await access(builtInPath)
    return builtInPath
  } catch {
    return getTemplatePath(templateName)
  }
}
