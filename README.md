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

### Events

You can subscribe to internal SDK events:

```typescript
WebApp.onEvent('close', () => {
  console.log('App is closing');
});
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

## Building

If you want to build the SDK locally:

```bash
npm run build
```

The build results will be available in the `dist/` directory.

## License

MIT
