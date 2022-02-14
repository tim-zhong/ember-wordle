import Service from '@ember/service';
import { action } from '@ember/object';
import { later, cancel } from '@ember/runloop';
import { TrackedMap } from 'tracked-maps-and-sets';

/**
 * Delay before removing inactive toasts from state to allow animation.
 */
const CLEAUP_DELAY_MS = 6000;

function generateToastId() {
  return Math.random().toString(36).substring(2, 9);
}

export default class ToastService extends Service {
  toastMap = new TrackedMap();

  get toasts() {
    return Array.from(this.toastMap.values()).reverse();
  }

  /**
   * Publish a toast to the queue.
   * @param {string} message - content of the toast
   * @param {number} durationMS - (optional) how long the toast should stay
   * @returns - returns a function for dismissing the toast
   */
  @action post(message, durationMS = null) {
    const id = generateToastId();
    this.toastMap.set(id, { id, message, active: true });

    const timers = durationMS
      ? [
          later(
            () =>
              this.toastMap.set(id, {
                ...this.toastMap.get(id),
                active: false,
              }),
            durationMS
          ),
          later(() => this.toastMap.delete(id), durationMS + CLEAUP_DELAY_MS),
        ]
      : [];

    return () => {
      timers.forEach(cancel);
      this.toastMap.delete(id);
    };
  }
}
