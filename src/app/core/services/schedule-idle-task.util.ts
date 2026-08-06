type IdleTask = () => void;

export function scheduleIdleTask(callback: IdleTask, timeoutMs = 250): void {
  if (typeof window === 'undefined') {
    callback();
    return;
  }

  const idleWindow = window as Window & {
    requestIdleCallback?: (callback: IdleTask, options?: { timeout?: number }) => number;
  };

  if (idleWindow.requestIdleCallback) {
    idleWindow.requestIdleCallback(() => callback(), { timeout: timeoutMs });
    return;
  }

  window.setTimeout(callback, timeoutMs);
}
