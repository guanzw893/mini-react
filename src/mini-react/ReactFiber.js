import { Placement, isStr } from './utils'
import { HostComponent } from './ReactWorkTags'

export function createFiber(vnode, returnFiber) {
  const fiber = {
    type: vnode.type,
    key: vnode.key,
    // 属性
    props: vnode.props,
    // 原生标签（dom 结构）
    // 函数组件
    // 类组件
    stateNode: null,
    // 第一个子节点 fiber
    child: null,
    // 下一个兄弟 fiber
    sibling: null,
    // 父 fiber
    return: returnFiber,
    // 记录位置
    index: null,
    // old fiber
    alternate: null,
    // 标记 fiber effect，如插入、更新
    flags: Placement
  }

  const { type } = vnode
  if (isStr(type)) {
    fiber.tag = HostComponent
  } else if (isFn(type)) {
  } else {
    // Fragment
  }

  return fiber
}
