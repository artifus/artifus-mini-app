import {WebApp as WebAppType, MiniAppEvent} from './types'
import {createBackButton} from './backButton'
import {createHapticFeedback} from './hapticFeedback'
import {getInitParamsFromHash, getLocationHashSafe, parseInitDataUnsafe} from './initData'
import {offEvent, onEvent, postEvent, receiveEvent} from './events'
import {MiniAppEventName} from './types'

function setupIframeListener() {
  try {
    const isIframe = window.parent != null && window !== window.parent
    if (!isIframe) return

    window.addEventListener('message', (event) => {
      if (event.source !== window.parent) return
      receiveEvent(event.data as MiniAppEvent)
    })
  } catch {
    // ignore
  }
}

setupIframeListener()

const initParams = getInitParamsFromHash(getLocationHashSafe())
const initData = initParams.artifusMiniAppData || ''
const initDataUnsafe = parseInitDataUnsafe(initData)

export const WebApp: WebAppType = {
  viewportHeight: window?.innerHeight || 0,
  viewportStableHeight: window?.innerHeight || 0,

  headerColor: '#000000',
  backgroundColor: '#000000',
  colorScheme: 'light',

  BackButton: createBackButton(),
  HapticFeedback: createHapticFeedback(),

  initData,
  initDataUnsafe,

  close: () => postEvent({event: MiniAppEventName.CLOSE, timestamp: Date.now()}),
  ready: () => postEvent({event: MiniAppEventName.READY, timestamp: Date.now()}),

  disableVerticalSwipes: () => {
    // TODO
  },
  expand: () => {
    // TODO
  },

  setHeaderColor: (_color) => {
    // TODO
  },
  setBackgroundColor: (_color) => {
    // TODO
  },

  openTelegramLink: (_link) => {
    // TODO
  },
  openLink: (_link) => {
    // TODO
  },

  enableClosingConfirmation: () => {
    // TODO
  },
  disableClosingConfirmation: () => {
    // TODO
  },

  onEvent,
  offEvent,
}