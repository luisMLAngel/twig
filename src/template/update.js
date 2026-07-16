import { readFile, writeFile, access } from 'node:fs/promises'
import { getTemplatePath, validateName } from './utils.js'
import { TemplateNotFoundError } from '../errors/RootiError.js'

export async function update(templateName, filePath) {
  validateName(templateName)

  if (!filePath) {
    throw new Error('It is required to enter the path of the new template file')
  }

  const templatePath = getTemplatePath(templateName)
  try {
    await access(templatePath)
  } catch {
    throw new TemplateNotFoundError(templateName)
  }

  const content = await readFile(filePath, 'utf8')
  await writeFile(templatePath, content)
}
