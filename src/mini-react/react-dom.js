import { createFiber } from './ReactFiber'
import { scheduleUpdateOnFiber } from './ReactFiberWorkLoop'

function ReactRootDom(internalRoot) {
  this._internalRoot = internalRoot
}

ReactRootDom.prototype.render = function (children) {
  const root = this._internalRoot
  updateContainer(children, root)
}

function updateContainer(element, container) {
  const { containerInfo } = container

  const fiber = createFiber(element, {
    type: containerInfo.nodeName.toLocaleLowerCase(),
    stateNode: containerInfo
  })

  scheduleUpdateOnFiber(fiber)
}

function createRoot(container) {
  const root = { containerInfo: container }
  return new ReactRootDom(root)
}

export default {
  createRoot
}
