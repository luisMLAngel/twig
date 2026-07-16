import { message } from '../utils/message.js'

export function printTree(title) {
  message(`\n ${title} \n`)
  return function recursivePrint(nodes, prefix = '') {
    nodes.forEach((node, index) => {
      const isLast = index === nodes.length - 1
      const connector = isLast ? '└── ' : '├── '
      message(`${prefix}${connector}${node.name}`)
      if (node.children?.length > 0) {
        const childPrefix = prefix + (isLast ? '    ' : '│   ')
        recursivePrint(node.children ?? [], childPrefix)
      }
    })
  }
}
