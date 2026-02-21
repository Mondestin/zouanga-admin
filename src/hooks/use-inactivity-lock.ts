'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const INACTIVITY_MS = 2 * 60 * 1000; // 2 minutes

const ACTIVITY_EVENTS = [
  'mousedown',
  'mousemove',
  'keydown',
  'scroll',
  'touchstart',
  'click'
] as const;

export function useInactivityLock() {
  const [isLocked, setIsLocked] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    timeoutRef.current = setTimeout(() => {
      setIsLocked(true);
      timeoutRef.current = null;
    }, INACTIVITY_MS);
  }, []);

  const unlock = useCallback(() => {
    setIsLocked(false);
    lastActivityRef.current = Date.now();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    timeoutRef.current = setTimeout(() => {
      setIsLocked(true);
      timeoutRef.current = null;
    }, INACTIVITY_MS);
  }, []);

  useEffect(() => {
    if (isLocked) return;
    resetTimer();
    const handleActivity = () => resetTimer();
    ACTIVITY_EVENTS.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });
    return () => {
      ACTIVITY_EVENTS.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isLocked, resetTimer]);

  return { isLocked, unlock };
}
