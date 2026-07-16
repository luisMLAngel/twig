import { save } from '../template/save.js'
import { remove } from '../template/remove.js'
import { list } from '../template/list.js'
import { update } from '../template/update.js'
import { info } from '../template/info.js'
import { message } from '../utils/message.js'

export async function addTemplate(template, options) {
  const templatePath = await save(template, options)
  message(`Template saved correctly in ${templatePath}`)
}

export async function removeTemplate(templateName) {
  await remove(templateName)
  message(`Template removed correctly!`)
}

export async function listTemplates() {
  await list()
}

export async function updateTemplate(templateName, filePath) {
  await update(templateName, filePath)
  message(`Template "${templateName}" updated correctly`)
}

export async function infoTemplate(templateName) {
  await info(templateName)
}
