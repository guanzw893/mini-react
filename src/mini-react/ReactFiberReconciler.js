import { createFiber } from './ReactFiber'
import { renderWithHooks } from './hooks'
import { Update, isStringOrNumber, sameNode, updateNode } from './utils'

export function updateHostComponent(wip) {
  if (!wip.stateNode) {
    // 创建节点
    wip.stateNode = document.createElement(wip.type)
  }

  updateNode(wip.stateNode, wip.props, wip.props)

  reconcileChildren(wip, wip.props.children)
}

export function updateFunctionComponent(wip) {
  renderWithHooks(wip)

  const { type, props } = wip

  const children = type(props)

  reconcileChildren(wip, children)
}

// 初次渲染
// 协调 diff
function reconcileChildren(wip, children) {
  const newChildren = Array.isArray(children) ? children : [children]
  const length = newChildren.length

  let oldFiber = wip.alternate?.child
  let previousNewFiber = null

  for (let i = 0; i < length; i++) {
    const newChild = newChildren[i]

    if (newChild === null || isStringOrNumber(newChild)) {
      continue
    }

    const newFiber = createFiber(newChild, wip)
    const same = sameNode(newFiber, oldFiber)
    if (same) {
      Object.assign(newFiber, {
        stateNode: oldFiber.stateNode,
        alternate: oldFiber,
        flags: Update
      })
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    if (previousNewFiber === null) {
      wip.child = newFiber
    } else {
      previousNewFiber.sibling = newFiber
    }

    previousNewFiber = newFiber
  }
}
