# Artifus Mini App SDK

SDK for developing mini-apps within the Artifus ecosystem. It provides a convenient interface for interacting with the app container, including handling initialization data, the back button, haptic feedback, and events.

## Installation

```bash
npm install artifus-mini-app
```

Or using CDN (IIFE build):

```html
<script src="https://unpkg.com/artifus-mini-app/dist/index.iife.js"></script>
<script>
  Artifus.WebApp.ready();
</script>
```

## Usage

### Initialization

To start, you need to call the `ready()` method, which informs the container that the application is ready to be displayed.

```typescript
import { WebApp } from 'artifus-mini-app';

// When using npm
WebApp.ready();

// Or when using CDN
Artifus.WebApp.ready();
```

### Event Model

The SDK communicates with the host container via `postMessage`. When running inside an iframe,
incoming messages from the parent window are parsed and dispatched to event subscribers.

```typescript
import { WebApp, MiniAppEventName } from 'artifus-mini-app';

WebApp.onEvent(MiniAppEventName.CLOSE, (event) => {
  console.log('Closing', event.timestamp);
});
```

### Initialization Data

The SDK automatically parses data from the URL hash.

```typescript
console.log(WebApp.initData); // Raw data string
console.log(WebApp.initDataUnsafe); // Object with user data
```

### Back Button

```typescript
const { BackButton } = WebApp;

BackButton.show();
BackButton.onClick(() => {
  console.log('Back button pressed');
  BackButton.hide();
});
```

### Haptic Feedback

```typescript
// Impact feedback
WebApp.HapticFeedback.impactOccurred('medium');

// Notification feedback
WebApp.HapticFeedback.notificationOccurred('success');

// Selection feedback
WebApp.HapticFeedback.selectionChanged();
```

### Exports

The package exports `WebApp` and all TypeScript types from `src/types.ts`:

```typescript
import { WebApp, MiniAppEventName, MiniWebAppUser } from 'artifus-mini-app';
```

## API

| Property/Method | Description |
| --- | --- |
| `initData` | String containing initialization data. |
| `initDataUnsafe` | Object with parsed user data. |
| `ready()` | Informs the container that the app is ready. |
| `close()` | Closes the mini-app. |
| `BackButton` | Object for managing the "Back" button. |
| `HapticFeedback` | Object for managing haptic feedback. |
| `viewportHeight` | Current viewport height. |
| `colorScheme` | Color scheme (`light` or `dark`). |

### Event Names

| Name | Description |
| --- | --- |
| `back_button_pressed` | Triggered when the container signals a back action. |
| `back_button_hide` | Sent when `BackButton.hide()` is called. |
| `back_button_show` | Sent when `BackButton.show()` is called. |
| `close` | Sent when `WebApp.close()` is called. |
| `ready` | Sent when `WebApp.ready()` is called. |
| `haptic_impact_occurred` | Sent when `HapticFeedback.impactOccurred()` is called. |
| `haptic_notification_occurred` | Sent when `HapticFeedback.notificationOccurred()` is called. |
| `haptic_selection_changed` | Sent when `HapticFeedback.selectionChanged()` is called. |

### Notes

- `disableVerticalSwipes`, `expand`, `setHeaderColor`, `setBackgroundColor`, `openTelegramLink`,
  `openLink`, `enableClosingConfirmation`, `disableClosingConfirmation` are placeholders and
  currently no-op in this SDK.
- The event bridge expects JSON-serialized events exchanged with the parent window via `postMessage`.

## Building

If you want to build the SDK locally:

```bash
npm run build
```

To rebuild on file changes:

```bash
npm run build:watch
```

The build results will be available in the `dist/` directory.

## License

MIT
