import { useEffect, useState } from 'react';
import { siteConfig } from '../config/siteConfig';

/**
 * Estado compartido a nivel de sesión de página para que todos los contadores
 * de escasez (Portada, Inversión y Cierre) muestren exactamente el mismo número
 * de cupos y desciendan sincronizados en el tiempo:
 * 7 → 6 (tras 10s) → 5 (tras +20s) → 4 (tras +30s) → 3 (tras +45s) → 2 (tras +60s, se detiene).
 */
const initialSpots = siteConfig.scarcity.initialSpots;
const minSpots = siteConfig.scarcity.minSpots;
const stepDelays = siteConfig.scarcity.stepDelaysSeconds;

let currentSpots = initialSpots;
let stepIndex = 0;
let timerStarted = false;
let timeoutId: number | null = null;
const listeners = new Set<(spots: number) => void>();

function notifyListeners() {
  for (const listener of listeners) {
    listener(currentSpots);
  }
}

function scheduleNextDrop() {
  if (typeof window === 'undefined') {
    return;
  }
  if (currentSpots <= minSpots) {
    return;
  }

  const delaySeconds =
    stepDelays[stepIndex] ?? stepDelays[stepDelays.length - 1] ?? 30;

  timeoutId = window.setTimeout(() => {
    if (currentSpots > minSpots) {
      currentSpots -= 1;
      stepIndex += 1;
      notifyListeners();
      scheduleNextDrop();
    }
  }, delaySeconds * 1000);
}

function ensureTimerStarted() {
  if (timerStarted || typeof window === 'undefined') {
    return;
  }
  timerStarted = true;
  scheduleNextDrop();
}

export function useScarcitySpots(): {
  spotsLeft: number;
  batchCapacity: number;
  filledPercentage: number;
} {
  const [spotsLeft, setSpotsLeft] = useState<number>(currentSpots);

  useEffect(() => {
    ensureTimerStarted();

    const handleUpdate = (nextSpots: number) => {
      setSpotsLeft(nextSpots);
    };

    listeners.add(handleUpdate);
    setSpotsLeft(currentSpots);

    return () => {
      listeners.delete(handleUpdate);
      if (listeners.size === 0 && timeoutId !== null && typeof window !== 'undefined') {
        window.clearTimeout(timeoutId);
        timeoutId = null;
        timerStarted = false;
      }
    };
  }, []);

  const batchCapacity = Math.max(1, siteConfig.scarcity.batchCapacity);
  const filledCount = Math.max(0, batchCapacity - spotsLeft);
  const filledPercentage = Math.min(
    98,
    Math.max(10, Math.round((filledCount / batchCapacity) * 100))
  );

  return {
    spotsLeft,
    batchCapacity,
    filledPercentage,
  };
}
