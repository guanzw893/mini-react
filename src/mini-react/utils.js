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

export function updateNode(node, nextVal) {
  Object.keys(nextVal).forEach((k) => {
    if (k === 'children') {
      if (isStringOrNumber(nextVal[k])) {
        node.textContent = nextVal[k]
      }
    } else {
      if (k === 'style') {
        Object.keys(nextVal[k]).forEach((s) => {
          node[k].setProperty(s, nextVal[k][s])
        })
      } else {
        node[k] = nextVal[k]
      }
    }
  })
}
