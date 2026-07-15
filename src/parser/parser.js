import { ParserTemplateError } from '../errors/ArborError.js'

export async function parser(content, options) {
  const lines = content.split(/\r?\n/)
  const tokens = []
  let index = 0
  for (const line of lines) {
    if (options.strict) {
      validateLine(line, index)
    } else if (line.replaceAll(' ', '').length === 0) {
      continue
    }
    tokens.push(tokenize(line, index))
    index++
  }
  return tokens
}

function tokenize(line, index) {
  const indentation = line.match(/^\s*/)[0].length
  return {
    type: line.endsWith('/') ? 'directory' : 'file',
    name: line.replace('/', '').trim(),
    line: index + 1,
    indentation: indentation,
  }
}

function validateLine(line, index) {
  const indentation = line.match(/^\s*/)[0].length
  if (line.replaceAll(' ', '').length === 0) {
    throw new ParserTemplateError(
      `Parse error on line ${index + 1}: blank lines are not allowed.`,
    )
  }
  if (indentation % 2 !== 0) {
    throw new ParserTemplateError(
      `Parse error on line ${index + 1}: invalid indentation. Indentation must use multiples of 2 spaces.\n> ${line.replaceAll(' ', '·')}`,
    )
  }
}
