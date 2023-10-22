export const NoFlags = /*                      */ 0b0000000000000000000000000000

export const Update = /*                       */ 0b0000000000000000000000000100

export const Placement = /*                    */ 0b0000000000000000000000000010

export const Deletions = /*                    */ 0b0000000000000000000000001000

export const isStr = (str) => {
  return typeof str === 'string'
}

export const isStringOrNumber = (n) => {
  return typeof n === 'string' || typeof n === 'number'
}

export const isFn = (fn) => {
  return typeof fn === 'function'
}

export function updateNode(node, oldVal, nextVal) {
  Object.keys(oldVal).forEach((key) => {
    if (key === 'children') {
      const children = Array.isArray(oldVal[key]) ? oldVal[key] : [oldVal[key]]
      const len = children.length
      for (let i = 0; i < len; i++) {
        if (isStringOrNumber(children[i])) {
          node.textContent = ''
        }
      }
    } else if (key === 'style') {
      Object.keys(oldVal[key]).forEach((s) => {
        node[key].removeProperty(s)
      })
    } else if (key.startsWith('on')) {
      node[key.toLocaleLowerCase()] = null
    } else {
      if (!(key in nextVal)) {
        node[key] = ''
      }
    }
  })

  Object.keys(nextVal).forEach((key) => {
    if (key === 'children') {
      const children = Array.isArray(nextVal[key])
        ? nextVal[key]
        : [nextVal[key]]

      const len = children.length
      for (let i = 0; i < len; i++) {
        if (isStringOrNumber(children[i])) {
          node.textContent = children[i]
        }
      }
    } else if (key === 'style') {
      Object.keys(nextVal[key]).forEach((s) => {
        node[key].setProperty(s, nextVal[key][s])
      })
    } else if (key.startsWith('on')) {
      node[key.toLocaleLowerCase()] = nextVal[key]
    } else {
      node[key] = nextVal[key]
    }
  })
}

// 同级，同类型，同 key
export function sameNode(a, b) {
  return a && b && a.type === b.type && a.key === b.key
}
