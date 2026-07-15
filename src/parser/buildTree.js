import { ParserTemplateError } from '../errors/RootiError.js'

export function buildTree(tokens, options) {
  const tree = []
  const stack = []

  for (const token of tokens) {
    const node = {
      ...token,
      children: token.type === 'directory' ? [] : undefined,
    }

    while (stack.length > 0 && stack.at(-1).indentation >= token.indentation) {
      stack.pop()
    }

    if (stack.length === 0) {
      tree.push(node)
    } else {
      if (options.strict) {
        validateNode(node, stack)
      }
      stack.at(-1).children.push(node)
    }

    if (node.type === 'directory') {
      stack.push(node)
    }
  }
  return tree
}

function validateNode(node, stack) {
  if (stack.at(-1).indentation + 2 < node.indentation) {
    throw new ParserTemplateError(
      `Parse error on line ${node.line}: indentation jumped more than one level.\n> ${'·'.repeat(node.indentation)}${node.name}${node.type === 'directory' ? '/' : ''}`,
    )
  }
}
