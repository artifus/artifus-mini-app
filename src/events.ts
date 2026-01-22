import { MiniAppEvent, MiniAppEventCallback, MiniAppEventName } from "./types";

const eventHandlers: Partial<Record<MiniAppEventName, MiniAppEventCallback[]>> = {};

export function postEvent(event: MiniAppEvent, callback: (arg0?: unknown) => void = () => {}) {
  if (event === undefined) console.error("[Artifus.WebView] > postEvent: event is undefined");
  console.log("[Artifus.WebView] > postEvent", event);

  try {
    window.parent.postMessage(JSON.stringify(event), "*");
    callback();
  } catch (e) {
    callback(e);
  }
}

export function receiveEvent(event: MiniAppEvent) {
  console.log("[Artifus.WebView] < receiveEvent", event);

  const isSupportedEvent = Object.values(MiniAppEventName).includes(event.event);
  if (!isSupportedEvent) {
    console.warn(
      `[Artifus.WebView] > receiveEvent: event "${JSON.stringify(event)}" is not supported`,
    );
    return;
  }

  callEventCallbacks(event.event, (cb) => cb(event));
}

function callEventCallbacks(eventType: MiniAppEventName, run: (cb: MiniAppEventCallback) => void) {
  const handlers = eventHandlers[eventType];
  if (!handlers?.length) return;

  for (const handler of handlers) {
    try {
      run(handler);
    } catch {
      // намеренно глотаем, чтобы один обработчик не ломал остальных
    }
  }
}

export function onEvent(eventType: MiniAppEventName, callback: MiniAppEventCallback) {
  eventHandlers[eventType] ??= [];
  if (!eventHandlers[eventType]!.includes(callback)) {
    eventHandlers[eventType]!.push(callback);
  }
}

export function offEvent(eventType: MiniAppEventName, callback: MiniAppEventCallback) {
  const handlers = eventHandlers[eventType];
  if (!handlers) return;

  const idx = handlers.indexOf(callback);
  if (idx >= 0) handlers.splice(idx, 1);
}