import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export async function generate(tree, outputDir) {
  for (const branch of tree) {
    if (branch.type === 'directory') {
      const dir = join(outputDir, branch.name)
      await mkdir(dir, { recursive: true })
      await generate(branch.children, dir)
    } else {
      await writeFile(join(outputDir, branch.name), '', 'utf8')
    }
  }
}
