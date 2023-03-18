import { parsers as typescriptParsers } from 'prettier/parser-typescript'
import { parsers as babelParsers } from 'prettier/parser-babel'

const originalParse = typescriptParsers.typescript

function getPropertyName(property: any): string {
  if (property.computed || !property.key || !property.key.name) {
    return ''
  }

  return property.key.name
}

function sortObjectProperties(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => sortObjectProperties(item))
  } else if (typeof obj === 'object' && obj !== null) {
    if (obj.type === 'ObjectExpression' || obj.type === 'ObjectPattern') {
      const sortedProperties = [...obj.properties].sort((a: any, b: any) => {
        const aName = getPropertyName(a)
        const bName = getPropertyName(b)

        const lengthDiff = aName.length - bName.length
        if (lengthDiff !== 0) {
          return lengthDiff
        }

        return aName.localeCompare(bName)
      })

      const sortedNestedProperties = sortedProperties.map((property: any) => ({
        ...property,
        value: sortObjectProperties(property.value),
      }))

      return {
        ...obj,
        properties: sortedNestedProperties,
      }
    }

    const newObj: any = {}
    for (const key in obj) {
      newObj[key] = sortObjectProperties(obj[key])
    }
    return newObj
  }
  return obj
}

export const parse = (text: string, parsers: any, options: any) => {
  const originalAST = originalParse.parse(text, parsers, options)
  const sortedAST = sortObjectProperties(originalAST)
  return sortedAST
}

module.exports = {
  parsers: {
    typescript: {
      ...typescriptParsers.typescript,
      parse: parse,
    },
    babel: {
      ...babelParsers.babel,
      parse: parse,
    },
    'babel-flow': {
      ...babelParsers['babel-flow'],
      parse: parse,
    },
    'babel-ts': {
      ...babelParsers['babel-ts'],
      parse: parse,
    },
  },
}
