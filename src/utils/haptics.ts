/**
 * Haptic feedback utility for mobile devices
 * Uses the Vibration API to provide tactile responses
 */

type HapticIntensity = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

const hapticPatterns: Record<HapticIntensity, number | number[]> = {
  light: 10,
  medium: 20,
  heavy: 30,
  success: [10, 50, 10],
  warning: [15, 100, 15],
  error: [30, 100, 30, 100, 30],
};

/**
 * Trigger haptic feedback if supported by the device
 * @param intensity - The intensity level of the haptic feedback
 */
export function triggerHaptic(intensity: HapticIntensity = 'light'): void {
  // Check if the Vibration API is supported
  if (!('vibrate' in navigator)) {
    return;
  }

  const pattern = hapticPatterns[intensity];
  
  try {
    navigator.vibrate(pattern);
  } catch (error) {
    console.warn('Haptic feedback failed:', error);
  }
}

/**
 * Cancel any ongoing haptic feedback
 */
export function cancelHaptic(): void {
  if ('vibrate' in navigator) {
    navigator.vibrate(0);
  }
}

/**
 * Check if haptic feedback is supported
 */
export function isHapticSupported(): boolean {
  return 'vibrate' in navigator;
}
