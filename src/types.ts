export interface WebApp {
  headerColor: `#${string}`;
  backgroundColor: `#${string}`;
  colorScheme: 'light' | 'dark';
  initData: string;
  initDataUnsafe: MiniAppInitData;

  ready: VoidFunction;
  disableVerticalSwipes: VoidFunction;
  setHeaderColor: (color: 'bg_color' | 'secondary_bg_color' | `#${string}`) => void;
  setBackgroundColor: (color: 'bg_color' | 'secondary_bg_color' | `#${string}`) => void;
  close: VoidFunction;
  expand: VoidFunction;

  BackButton: BackButton;
  openLink: (link: string) => void;
  openTelegramLink: (link: string) => void;
  openInvoice: (
    url: string,
    callback?: (status: InvoiceStatuses) => unknown
  ) => void;

  enableClosingConfirmation: VoidFunction;
  disableClosingConfirmation: VoidFunction;

  HapticFeedback: HapticFeedback;

  onEvent: <T extends MiniAppEventName>(eventName: T, callback: MiniAppEventCallback) => void;
  offEvent: <T extends MiniAppEventName>(eventName: T, callback: MiniAppEventCallback) => void;

  viewportHeight: number;
  viewportStableHeight: number;
}

export interface BackButton {
  isVisible: boolean;
  show: () => BackButton;
  hide: () => BackButton;
  onClick: (cb: VoidFunction) => BackButton;
  offClick: (cb: VoidFunction) => BackButton;
}

export type HapticFeedbackImpactStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';
export type HapticFeedbackNotificationType = 'error' | 'success' | 'warning';

export interface HapticFeedback {
  impactOccurred: (style: HapticFeedbackImpactStyle) => HapticFeedback;
  notificationOccurred: (type: HapticFeedbackNotificationType) => HapticFeedback;
  selectionChanged: () => HapticFeedback;
}

export interface MiniAppTelegramAccount {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  photo_url: string;
}

export interface MiniAppGoogleAccount {
  email: string;
  picture: string;
}

export interface MiniWebAppUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  is_verified: boolean;
  telegram_account?: MiniAppTelegramAccount;
  google_account?: MiniAppGoogleAccount;
}

export interface MiniAppInitData {
  user: MiniWebAppUser;
  auth_date: number;
  hash: string;
  start_param?: string;
}

export enum MiniAppEventName {
  BACK_BUTTON_PRESSED = 'back_button_pressed',
  BACK_BUTTON_HIDE = 'back_button_hide',
  BACK_BUTTON_SHOW = 'back_button_show',
  CLOSE = 'close',
  READY = 'ready',
  HAPTIC_IMPACT_OCCURRED = 'haptic_impact_occurred',
  HAPTIC_NOTIFICATION_OCCURRED = 'haptic_notification_occurred',
  HAPTIC_SELECTION_CHANGED = 'haptic_selection_changed',
  OPEN_INVOICE = 'open_invoice',
  INVOICE_CLOSED = 'invoice_closed',
}

export interface MiniAppEvent {
  event: MiniAppEventName;
  timestamp: number;
  payload?: any;
}

export type MiniAppEventCallback = (event: MiniAppEvent) => void;

export type InvoiceStatuses = "pending" | "failed" | "cancelled" | "paid"
