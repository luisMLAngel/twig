import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { TemplateNameIsRequiredError } from '../errors/RootiError.js'

export function getTemplatesDir() {
  return join(homedir(), '.rooti', 'templates')
}

export function getRootiTemplatesDir() {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  return join(__dirname, '../templates/')
}

export function getTemplatePath(name) {
  return join(getTemplatesDir(), `${name}.rooti`)
}

export function getRootiTemplatePath(name) {
  return join(getRootiTemplatesDir(), `${name}.rooti`)
}

export function validateName(name) {
  if (!name) {
    throw new TemplateNameIsRequiredError(
      'It is required to enter the name of the template',
    )
  }
}
