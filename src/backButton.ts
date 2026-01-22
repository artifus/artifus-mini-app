import {BackButton, MiniAppEventName} from './types'
import {onEvent, offEvent, postEvent} from './events'

export function createBackButton(): BackButton {
  const backButton: BackButton = {
    isVisible: false,
    show: () => {
      backButton.isVisible = true
      postEvent({event: MiniAppEventName.BACK_BUTTON_SHOW, timestamp: Date.now()})
      return backButton
    },
    hide: () => {
      backButton.isVisible = false
      postEvent({event: MiniAppEventName.BACK_BUTTON_HIDE, timestamp: Date.now()})
      return backButton
    },
    onClick: (cb) => {
      onEvent(MiniAppEventName.BACK_BUTTON_PRESSED, cb)
      return backButton
    },
    offClick: (cb) => {
      offEvent(MiniAppEventName.BACK_BUTTON_PRESSED, cb)
      return backButton
    },
  }

  return backButton
}