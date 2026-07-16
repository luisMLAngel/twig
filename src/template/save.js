import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import {
  EmptyTemplateError,
  TemplateNameAlreadyExistsError,
} from '../errors/RootiError.js'
import { getTemplatesDir, getTemplatePath, validateName } from './utils.js'
import { INNER_TEMPLATES } from '../config/config.js'

export async function save(template, options) {
  const name = options.name
  validateName(name)
  validateName(template)

  if (INNER_TEMPLATES.includes(name)) {
    throw new TemplateNameAlreadyExistsError(
      'The name of that template cannot be used, it is already part of rooti',
    )
  }

  const content = await readFile(template, 'utf8')
  if (content.replaceAll(' ', '').length === 0) {
    throw new EmptyTemplateError('The template is empty')
  }

  const templatesDir = getTemplatesDir()
  await mkdir(templatesDir, { recursive: true })

  const files = await readdir(templatesDir)
  if (files.some((file) => file === `${name}.rooti`)) {
    throw new TemplateNameAlreadyExistsError(
      'The name of that template cannot be used, it is already part of your templates, you can see your templates with rooti template list',
    )
  }

  const templatePath = getTemplatePath(name)
  await writeFile(templatePath, content)
  return templatePath
}
