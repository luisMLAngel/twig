import { readdir, mkdir } from 'node:fs/promises'
import { parse } from 'node:path'
import { getTemplatesDir, getRootiTemplatesDir } from './utils.js'
import { INNER_TEMPLATES } from '../config/config.js'
import { message } from '../utils/message.js'

export async function list() {
  const rootiDir = getRootiTemplatesDir()
  const rootiFiles = await readdir(rootiDir)
  const builtIn = rootiFiles
    .filter((f) => f.endsWith('.rooti'))
    .map((f) => parse(f).name)
    .sort()

  message('Built-in templates:')
  if (builtIn.length === 0) {
    message('  (none)')
  } else {
    for (const name of builtIn) {
      message(`  ✓ ${name}`)
    }
  }

  message('')

  const templatesDir = getTemplatesDir()
  await mkdir(templatesDir, { recursive: true })
  const customFiles = await readdir(templatesDir)
  const custom = customFiles
    .filter((f) => f.endsWith('.rooti'))
    .map((f) => parse(f).name)
    .sort()

  message('Custom templates:')
  if (custom.length === 0) {
    message('  (none)')
  } else {
    for (const name of custom) {
      message(`  ✓ ${name}`)
    }
  }
}
