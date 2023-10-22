import { createFiber } from './ReactFiber'
import { isStringOrNumber, updateNode } from './utils'

export function updateHostComponent(wip) {
  if (!wip.stateNode) {
    // 创建节点
    wip.stateNode = document.createElement(wip.type)
  }

  console.dir('wip.stateNode', wip.stateNode)
  updateNode(wip.stateNode, wip.props)

  reconcileChildren(wip, wip.props.children)
}

// 初次渲染
// 协调 diff
function reconcileChildren(wip, children) {
  const newChildren = Array.isArray(children) ? children : [children]
  const length = newChildren.length

  let previousNewFiber = null

  for (let i = 0; i < length; i++) {
    const newChild = newChildren[i]

    if (newChild === null || isStringOrNumber(newChild)) {
      continue
    }

    const newFiber = createFiber(newChild, wip)
    if (previousNewFiber === null) {
      wip.child = newFiber
    } else {
      previousNewFiber.sibling = newFiber
    }

    previousNewFiber = newFiber
  }
}
