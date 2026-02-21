'use client';

import { useInactivityLock } from '@/hooks/use-inactivity-lock';
import { LockScreen } from './lock-screen';
import { useCallback } from 'react';

interface DashboardWithInactivityLockProps {
  children: React.ReactNode;
  userName?: string;
  userRole?: string;
}

/**
 * Unlock accepts any non-empty password for demo.
 * Replace with real auth check (e.g. verify session password) in production.
 */
function validateUnlockPassword(password: string): boolean {
  return password.length > 0;
}

export function DashboardWithInactivityLock({
  children,
  userName = 'Admin User',
  userRole = 'Administrator'
}: DashboardWithInactivityLockProps) {
  const { isLocked, unlock } = useInactivityLock();

  const handleUnlock = useCallback((password: string): boolean => {
    return validateUnlockPassword(password);
  }, []);

  return (
    <>
      {children}
      {isLocked && (
        <LockScreen
          onUnlock={handleUnlock}
          onUnlockComplete={unlock}
          userName={userName}
          userRole={userRole}
        />
      )}
    </>
  );
}
