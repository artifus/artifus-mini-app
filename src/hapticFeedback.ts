import {HapticFeedback, HapticFeedbackImpactStyle, HapticFeedbackNotificationType, MiniAppEventName} from './types'
import {postEvent} from './events'

export function createHapticFeedback(): HapticFeedback {
  const haptic: HapticFeedback = {
    impactOccurred: (style: HapticFeedbackImpactStyle) => {
      postEvent({
        event: MiniAppEventName.HAPTIC_IMPACT_OCCURRED,
        timestamp: Date.now(),
        payload: { style }
      })
      return haptic
    },
    notificationOccurred: (type: HapticFeedbackNotificationType) => {
      postEvent({
        event: MiniAppEventName.HAPTIC_NOTIFICATION_OCCURRED,
        timestamp: Date.now(),
        payload: { type }
      })
      return haptic
    },
    selectionChanged: () => {
      postEvent({
        event: MiniAppEventName.HAPTIC_SELECTION_CHANGED,
        timestamp: Date.now()
      })
      return haptic
    },
  }
  return haptic
}