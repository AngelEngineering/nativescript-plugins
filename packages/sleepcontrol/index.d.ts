/**
 * Check if the current device can go into sleep mode after the current system idle time limit. Use denySleep() to disable sleep, and allowSleep() to enable sleep.
 * @function isSleepAllowed
 * @returns true if sleep is allowed, false if not
 */
export function isSleepAllowed(): boolean;

/**
 * Disable device sleep mode
 * @function denySleep
 */
export function denySleep(): void;

/**
 * Enable device sleep mode
 * @function allowSleep
 */
export function allowSleep(): void;
