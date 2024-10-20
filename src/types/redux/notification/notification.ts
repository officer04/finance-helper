export interface Notification {
  infoNotification: 'success' | 'info' | 'warning' | 'error' | undefined;
  text: string;
}
