import { scheduleUpdateOnFiber } from './ReactFiberWorkLoop'

let currentlyRenderingFiber = null
let workInProgressHook = null

export function renderWithHooks(wip) {
  currentlyRenderingFiber = wip
  currentlyRenderingFiber.memorizedState = null
  workInProgressHook = null
}

function updataWorkInProgressHook() {
  let hook

  // old fiber
  const current = currentlyRenderingFiber.alternate
  if (!current) {
    // 组件初次渲染
    hook = { memorizedState: null, next: null }

    if (!workInProgressHook) {
      // hook0
      workInProgressHook = currentlyRenderingFiber.memorizedState = hook
    } else {
      workInProgressHook = workInProgressHook.next = hook
    }
  } else {
    // 组件更新渲染
    currentlyRenderingFiber.memorizedState = current.memorizedState

    if (!workInProgressHook) {
      // hook0
      workInProgressHook = hook = currentlyRenderingFiber.memorizedState
    } else {
      workInProgressHook = hook = workInProgressHook.next
    }
  }

  return hook
}

export function useReducer(reducer, initialState) {
  // 当前 useReducer 对应的 hook
  const hook = updataWorkInProgressHook()

  if (!currentlyRenderingFiber.alternate) {
    hook.memorizedState = initialState
  }

  const dispatch = (action) => {
    hook.memorizedState = reducer(hook.memorizedState, action)
    currentlyRenderingFiber.alternate = { ...currentlyRenderingFiber }
    scheduleUpdateOnFiber(currentlyRenderingFiber)
  }

  return [hook.memorizedState, dispatch]
}
