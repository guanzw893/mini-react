import {
  updateFunctionComponent,
  updateHostComponent
} from './ReactFiberReconciler'
import { FunctionComponent, HostComponent } from './ReactWorkTags'
import { Placement } from './utils'

// work in progress 当前正在工作中的
let wip = null
let wipRoot = null

export function scheduleUpdateOnFiber(fiber) {
  wip = fiber
  wipRoot = fiber
}

function performUnitWork() {
  // 1. 处理当前 wip
  const { tag } = wip

  switch (tag) {
    case HostComponent:
      updateHostComponent(wip)
      break
    case FunctionComponent:
      updateFunctionComponent(wip)
      break
  }

  // 2. 更新 wip
  if (wip.child) {
    wip = wip.child
    return
  }

  let next = wip
  while (next) {
    if (next.sibling) {
      wip = next.sibling
      return
    }
    next = next.return
  }

  wip = null
}

function workLoop(IdleDeadLine) {
  while (IdleDeadLine.timeRemaining() > 0 && wip) {
    performUnitWork()
  }

  // 提交
  if (!wip && wipRoot) {
    commitRoot()
  }
}

requestIdleCallback(workLoop)

function commitRoot() {
  commitWorker(wipRoot)
  wipRoot = null
}

function commitWorker(wip) {
  if (!wip) {
    return
  }
  // 1. 提交自己
  const { flags, stateNode } = wip
  const parentNode = getParentNode(wip.return)
  if (flags & Placement && stateNode) {
    parentNode.appendChild(stateNode)
  }
  // 2. 提交子节点
  commitWorker(wip.child)
  // 3. 提交兄弟
  commitWorker(wip.sibling)
}

function getParentNode(wip) {
  let tem = wip

  while (tem) {
    if (tem.stateNode) {
      return tem.stateNode
    }
    tem = tem.return
  }
}
